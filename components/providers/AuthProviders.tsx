import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from 'expo-web-browser';

import * as Linking from 'expo-linking';


interface AuthProps {
    authState?: { 
        access_token: string | null;
        refresh_token: string | null;
        authenticated: boolean;
    };
    isLoading?: boolean;
    onGoogleLogin?: () => Promise<{ error: boolean; msg: any; } | undefined>;
    RefreshToken?: () => Promise<void>;
    onRegister?: (email: string, username: string, password: string, repassword: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<void>;
}

const REFRESH_TOKEN_KEY = "refresh_token";
const ACCESS_TOKEN_KEY = "access_token";
export const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

interface authStateType {
    access_token: string | null;
    refresh_token: string | null;
    authenticated: boolean;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [failedQueue, setFailedQueue] = useState<any[]>([]);

    const [authState, setAuthState] = useState<authStateType>({
        access_token: null,
        refresh_token: null,
        authenticated: false,
    });

    const performLogout = async () => {
        // 這裡只做客戶端清除，因為 token 失效了呼叫後端 logout 也會失敗
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            access_token: null,
            refresh_token: null,
            authenticated: false,
        });
        setIsLoading(false);
    };




    useEffect(() => {
        const loadTokens = async () => {
            setIsLoading(true);
            const refresh_token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            const access_token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            console.log("Loaded tokens:", { refresh_token, access_token });

            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            // setAuthState({
            //     access_token,
            //     refresh_token,
            //     authenticated: true,
            // });
            if (!authState.authenticated) {
                setAuthState({
                    access_token,
                    refresh_token,
                    authenticated: true,
                });
            }
            console.log("Auth state after loading tokens:", authState);
            setIsLoading(false);
        }
        loadTokens();
    }, [authState]);

    useEffect(() => {
        const processQueue = (error: any, token: string | null = null) => {
            failedQueue.forEach((prom) => {
                if (error) {
                    prom.reject(error); // 如果刷新失敗，讓等待的請求也失敗
                } else {
                    prom.resolve(token); // 如果刷新成功，把新 token 傳給等待的請求
                }
            });
            setFailedQueue([]); // 清空佇列
        };

        const refreshInterceptor = axios.interceptors.response.use(
            (response) => response, // 如果成功，直接回傳
            async (error) => {
                const originalRequest = error.config;
                // 檢查是否為 401 錯誤，且這個請求還沒被重試過 (避免無窮迴圈)
                if (error.response?.status === 401 && !originalRequest._retry) {

                    if (isLoading) {
                        // 如果已經在刷新中，將請求加入佇列，等待刷新完成
                        return new Promise((resolve, reject) => {
                            setFailedQueue((prev) => [
                                ...prev,
                                { resolve, reject }
                            ]);
                        }).then((token) => {
                            originalRequest.headers['Authorization'] = `Bearer ${token}`;
                            return axios(originalRequest);
                        }).catch((err) => {
                            return Promise.reject(err);
                        });
                    }

                    originalRequest._retry = true; // 標記為已重試
                    setIsLoading(true);

                    try {
                        // 1. 從 SecureStore 讀取最新的 Refresh Token
                        // (不要依賴 state，因為在 callback 中 state 可能是舊的)
                        const currentRefreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

                        if (!currentRefreshToken) {
                            throw new Error("No refresh token available");
                        }

                        // 2. 呼叫 Refresh API
                        const response = await axios.post(`${API_URL}/auth/refresh`, {
                            refresh_token: currentRefreshToken,
                        });

                        const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;

                        // 3. 更新 SecureStore
                        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
                        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);

                        // 4. 更新 Axios 全域 Header
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                        // 5. 更新 React State (讓 UI 保持同步)
                        setAuthState((prev) => ({
                            ...prev,
                            access_token: newAccessToken,
                            refresh_token: newRefreshToken,
                            authenticated: true // 確保狀態正確
                        }));

                        processQueue(null, newAccessToken);

                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);

                    } catch (refreshError) {
                        // 如果換發 Token 也失敗 (例如 Refresh Token 也過期了)
                        console.error("Auto refresh failed:", refreshError);
                        // 執行登出清除資料
                        processQueue(refreshError, null);
                        await performLogout();
                        return Promise.reject(refreshError);
                    } finally {
                        setIsLoading(false);
                    }
                }

                // 如果不是 401 或已經重試過，直接拋出錯誤
                return Promise.reject(error);
            }
        );

        // Cleanup: 當 Component unmount 時移除攔截器，避免重複綁定
        return () => {
            axios.interceptors.response.eject(refreshInterceptor);
        };
    }, [failedQueue, isLoading]);

    const register = async (email: string, username: string, password: string, repassword: string) => {
        try {
            return await axios.post(`${API_URL}/auth/register`, 
                {
                    Email: email,
                    Username: username,
                    Password: password,
                    RePassword: repassword,
                }
            );
        } catch (e) {
            return { error: true, msg: (e as any).response?.data?.message || "Registration failed" };
        }
    };


    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                Email: email,
                Password: password,
            });

            setAuthState({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token,
                authenticated: true,
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, response.data.refresh_token);
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, response.data.access_token);

            return response;

        } catch (e) {
            return { error: true, msg: (e as any).response?.data?.message || "Registration failed" };
        }
    };

    const google_login = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/auth/google/login`, 
            );

            if (response.status !== 200) {
                console.log("Google login response:", response);
                throw new Error("Google Login failed");
            }

            // 2. 使用 WebBrowser 開啟該 URL
            // 這會在 App 內彈出一個瀏覽器視窗
            const result = await WebBrowser.openAuthSessionAsync(response.data.url, Linking.createURL("/"));

            console.log(result)

            if (result.type === 'success') {
                // 3. 處理登入成功後的邏輯
                // 通常成功後，WebBrowser 會自動關閉，並帶回 token 參數
                const { url } = result;
                console.log("登入成功回傳的 URL:", url);
                // 解析 URL 中的 Token...
                const refresh_token = url.split('refresh_token=')[1].split('&')[0];
                const access_token = url.split('access_token=')[1].split('&')[0];
                setAuthState({
                    access_token,
                    refresh_token,
                    authenticated: true,
                });
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token);
                await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
            } else {
                console.log("Google login cancelled or failed:", result);
            }
        } catch (e) {
            console.log("Google login error:", e);
            return { error: true, msg: (e as any).response?.data?.message || "Google Login failed" };
        }

    };

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/auth/logout`, {
                refresh_token: authState.refresh_token,
            });
        } catch (e) {
            console.error("Logout API failed", e);
        } finally {
            await performLogout();
        }
    };


    const refresh_token = async () => {
        try {
            const response = await axios.post(`${API_URL}/auth/refresh`, {
                refresh_token: authState.refresh_token,
            });
            setAuthState({
                access_token: response.data.access_token,
                refresh_token: authState.refresh_token,
                authenticated: true,
            }); 
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, response.data.access_token);
        } catch (e) {
            console.error("Token refresh failed", e);
            setAuthState({
                access_token: null,
                refresh_token: null,
                authenticated: false,
            });
        } 
    };


    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onGoogleLogin: google_login,
        onRefreshToken: refresh_token,
        authState,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

