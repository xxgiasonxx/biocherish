import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from 'expo-web-browser';

import * as Linking from 'expo-linking';


interface AuthProps {
    authState?: { 
        access_token: string | null;
        refresh_token: string | null;
        authenticated: boolean | null;
    };
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [authState, setAuthState] = useState<{
        access_token: string | null;
        refresh_token: string | null;
        authenticated: boolean | null;
    }>({
        access_token: null,
        refresh_token: null,
        authenticated: null,
    });


    useEffect(() => {
        const loadTokens = async () => {
            const refresh_token = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
            const access_token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            console.log("Loaded tokens:", { refresh_token, access_token });

            if (refresh_token && access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                setAuthState({
                    access_token,
                    refresh_token,
                    authenticated: true,
                });
            }
        }
        loadTokens();
    }, []);

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
            const response = await axios.post(`${API_URL}/auth/logout`, {
                refresh_token: authState.refresh_token,
            });

            if (response.status !== 200) {
                throw new Error("Logout failed");
            }

            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);

            axios.defaults.headers.common['Authorization'] = '';

            setAuthState({
                access_token: null,
                refresh_token: null,
                authenticated: false,
            });
        } catch (e) {
            console.error("Logout failed", e);
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
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

