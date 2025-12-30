import { Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import axios from 'axios';

const API_URL = Platform.select({
  web: process.env.EXPO_PUBLIC_WEB_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
});

export default function Layout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [device_id, setDeviceId] = useState<string | null>(null);
  const { color } = useContext(ThemeContext);



  useEffect(() => {
    const get_device_id = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/device/getDevice`,
          {
            bottle_id: id,
          }
        );
        if (response.status === 200) {
          setDeviceId(response.data.device_id);
        } else {
          console.error('Failed to fetch device ID');
          return null;
        }
      } catch (error) {
        console.error('Error fetching device ID:', error);
        return null;
      }
    }
    get_device_id();
  }, []);
  

  const manual_device_capture = async () => {
    try {
      console.log('device_id:', device_id);
      if (!device_id) {
        alert('無法取得裝置ID，請稍後再試。');
        return;
      }
      const response = await axios.post(
        `${API_URL}/device/manualScan`,
        {
          device_id: device_id,
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
        statusBarStyle: 'auto',
        contentStyle: { backgroundColor: color.Background },
        headerBackButtonDisplayMode: 'generic',
        headerStyle: {
          backgroundColor: color.TabbarBg,
        },
        headerTitleStyle: {
          color: color.TabbarColor,
        },
        headerTintColor: color.TabbarColor,
        headerTitleAlign: 'center',
        headerTitle(props) {
          return (
            <>
              <Text style={{ color: color.TabbarColor, fontSize: 18, fontWeight: 'bold' }}>{props.children}</Text>
            </>
          );
        }
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
                <Text className='text-TextColor dark:text-DarkTextColor'>手動拍攝</Text>
              </Pressable>
            ),
          }}
       />
      <Stack.Screen name="history" options={{
      }} />
    </Stack>
  );
}
