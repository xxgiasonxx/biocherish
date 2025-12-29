import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import axios from 'axios';

const API_URL = Platform.select({
  web: process.env.EXPO_PUBLIC_WEB_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
});

export default function Layout() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const manual_device_capture = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/device/manualScan`,
        {
          device_id: id,
        }
      );
      if (response.status === 200) {
        alert('已成功觸發手動拍攝，請稍後查看最新上傳資料。');
      } else {
        alert('手動拍攝觸發失敗，請稍後再試。');
      }
    } catch (error) {
      console.error('Error in manual_device_capture:', error);
      alert('手動拍攝觸發失敗，請稍後再試。');
    }
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" 
          options={{
            headerTitle: '詳細資料',
            // 在右側放按鈕
            headerRight: () => (
              <Pressable
                onPress={manual_device_capture}
                className='mr-4 bg-Background dark:bg-DarkBackground p-2 rounded-2xl'
              >
                <Text className='text-PrimaryBtnColor dark:text-DarkPrimaryBtnColor'>手動拍攝</Text>
              </Pressable>
            ),
          }}
       />
      <Stack.Screen name="history" options={{
      }} />
      <StatusBar style="auto" />
    </Stack>
  );
}
