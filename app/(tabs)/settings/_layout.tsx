
import { Stack } from 'expo-router';
import { useContext } from 'react';
import { ThemeContext } from '@/components/providers/ThemeProviders';


export default function Layout() {
  const { color } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerBackButtonMenuEnabled: true,
        headerBackButtonDisplayMode: 'generic',
        headerStyle: {
          backgroundColor: color.TabbarBg,
        },
        headerTitleStyle: {
          color: color.TabbarColor,
        },
        headerTitleAlign: 'center',
        headerTintColor: color.TabbarColor,
      }}
    >

      <Stack.Screen name="index"
        options={{
          title: '設定'
        }}
      />
      <Stack.Screen name="notifications"
        options={{
          title: '通知設定'
        }}
      />
      <Stack.Screen name="personal"
        options={{
          title: '個人設定'
        }}
      />
    </Stack>
  );
}
