import { useState } from "react";
import { View, Text, Alert, ActivityIndicator, Pressable, Linking, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import * as Sharing from 'expo-sharing';
import { useAuth } from "@/components/providers/AuthProviders";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';
import axios from "axios";
import { LoadingPage } from "@/app/LoadingPage";
import { Section } from "@/components/Section";
import { Main } from "@/components/Main";

const API_URL = Platform.select({
    web: process.env.EXPO_PUBLIC_WEB_API_URL,
    default: process.env.EXPO_PUBLIC_API_URL,
});

function SecondNewEdgePage() {
    const [loading, setLoading] = useState(false);
    const { deviceId } = useLocalSearchParams<{ deviceId: string }>();
    const { authState } = useAuth();
    const router = useRouter();
    // const [fileOne, setFileOne] = useState<string | null>(null);
    // const [fileTwo, setFileTwo] = useState<string | null>(null);
    const BinUri = `${API_URL}/device/${deviceId}/bin`;
    const ZipUri = `${API_URL}/device/${deviceId}/zip`;

    const ConnectTextHandle = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/device/${deviceId}/connect`);
            if (response.status !== 200) {
                if (Platform.OS === 'web') {
                    alert('無法連線到裝置，請稍後再試。');
                    return;
                }
                Alert.alert('錯誤', '無法連線到裝置，請稍後再試');
                return;
            }
            if (response.data.isConnected !== true) {
                if (Platform.OS === 'web') {
                    alert('無法連線到裝置，請稍後再試。');
                    return;
                }
                Alert.alert('錯誤', '無法連線到裝置，請稍後再試');
                return;
            }
            if (Platform.OS === 'web') {
                alert('已成功連線到裝置！');
            } else {
                Alert.alert('成功', '已成功連線到裝置！');
            }
            setTimeout(() => {
                router.replace('/(tabs)/home');
            }, 8000);
        } catch (error) {
            console.error('Error connecting to device:', error);
            Alert.alert('錯誤', '連線到裝置時發生錯誤，請稍後再試。');
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <Main>
            <Section>
                <View className="flex-1 bg-Background dark:bg-DarkBackground px-6 py-8">
                    {/* Header Section */}
                    <View className="items-center mb-8">
                        <Text className="text-3xl font-bold text-TextColor dark:text-DarkTextColor text-center mb-3">
                            🎉 裝置建立成功！🎉
                        </Text>
                        <Text className="text-base text-TextColor dark:text-DarkTextColor text-center">
                            請下載以下檔案並依照說明完成設定
                        </Text>
                    </View>

                    {/* Instructions Container */}
                    <View className="space-y-6 gap-3">
                        {/* BIN File Section */}
                        <View className="bg-Background dark:bg-DarkBackground rounded-3xl p-6 shadow-xl">
                            <View className="flex-row items-center mb-3">
                                <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mr-3">
                                    <Text className="text-TextColor dark:text-DarkTextColor font-bold text-lg">1</Text>
                                </View>
                                <Text className="text-xl font-bold text-TextColor dark:text-DarkTextColor">
                                    BIN 韌體檔案
                                </Text>
                            </View>

                            <Text className="text-TextColor dark:text-DarkTextColor leading-6 mb-4">
                                此檔案為裝置韌體，請下載並燒錄至您的 ESP32 裝置中。{'\n'}
                                建議使用 <Text className="font-semibold text-blue-600 dark:text-blue-400" onPress={() => Linking.openURL('https://web.esphome.io/')}>https://web.esphome.io/</Text> 網站進行燒錄。
                            </Text>

                            <DownloadButton
                                name="BIN 檔案"
                                fileUrl={BinUri}
                                fileName={`device_${deviceId}.bin`}
                                token={authState?.access_token}
                            />
                        </View>

                        {/* ZIP File Section */}
                        <View className="bg-Background dark:bg-DarkBackground rounded-3xl p-6 shadow-xl">
                            <View className="flex-row items-center mb-3">
                                <View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center mr-3">
                                    <Text className="text-TextColor dark:text-DarkTextColor font-bold text-lg">2</Text>
                                </View>
                                <Text className="text-xl font-bold text-TextColor dark:text-DarkTextColor">
                                    資源壓縮檔
                                </Text>
                            </View>

                            <Text className="text-TextColor dark:text-DarkTextColor leading-6 mb-4">
                                此檔案包含裝置所需的資源檔案，請下載並解壓縮後，透過 Arduino IDE 燒入至 ESP32 裝置中。
                            </Text>

                            <DownloadButton
                                name="資源壓縮檔"
                                fileUrl={ZipUri}
                                fileName={`device_${deviceId}_resources.zip`}
                                token={authState?.access_token}
                            />
                        </View>
                    </View>

                    {/* 連線測試按鈕 */}
                    <Pressable>
                        <Text
                            className="bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor text-TextColor dark:text-DarkTextColor font-bold text-center py-3 px-6 rounded-2xl mt-10"
                            onPress={ConnectTextHandle}
                        >
                            測試裝置連線狀態
                        </Text>
                    </Pressable>
                </View>
            </Section>
        </Main>
    );
}

interface DownloadButtonProps {
    name: string;
    fileUrl: string;
    fileName: string;
    token: string | undefined | null;
}

export function DownloadButton({ fileUrl, fileName, token, name }: DownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);
    const scale = useSharedValue(1);

    const handleDownload = async () => {
        setIsDownloading(true);
        scale.value = withRepeat(
            withSequence(withTiming(0.95, { duration: 500 }), withTiming(1, { duration: 500 })),
            -1,
            true
        );

        try {
            if (Platform.OS === 'web') {
                // --- Web 端的下載邏輯 ---
                const response = await fetch(fileUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/octet-stream',
                    },
                });

                if (!response.ok) throw new Error('網路回應不正確');

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName; // Web 下載會直接存入使用者的「下載」資料夾
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                // --- 原生端 (iOS/Android) 的下載邏輯 ---
                const { Directory, File, Paths } = (await import('expo-file-system/next')) as any;

                const cacheDir = new Directory(Paths.cache, 'downloads');

                if (!cacheDir.exists) {
                    cacheDir.create();
                }

                const targetFile = new File(cacheDir, fileName);

                await File.downloadFileAsync(fileUrl, targetFile, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (targetFile.exists) {
                    await Sharing.shareAsync(targetFile.uri);
                }
            }
        } catch (error) {
            console.error('Download Error:', error);
            Alert.alert('下載失敗', '無法完成下載，請檢查網路連線。');
        } finally {
            setIsDownloading(false);
            scale.value = withTiming(1);
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View style={[animatedStyle]}>
            <Pressable
                className={`px-6 py-4 rounded-2xl flex-row justify-center items-center ${isDownloading ? 'bg-gray-400' : 'bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
                    } active:opacity-80`}
                onPress={handleDownload}
                disabled={isDownloading}
            >
                {isDownloading ? (
                    <View className="flex-row items-center">
                        <ActivityIndicator color="#fff" />
                        <Text className="text-TextColor dark:text-DarkTextColor font-bold ml-2">正在處理...</Text>
                    </View>
                ) : (
                    <Text className="text-TextColor dark:text-DarkTextColor font-bold text-lg">下載 {name}</Text>
                )}
            </Pressable>
        </Animated.View>
    );
}

export default SecondNewEdgePage;