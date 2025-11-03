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
        headerTintColor: color.TabbarColor,
      }}
    >

      <Stack.Screen name="index" options={{ headerShown: true }} />
      {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      {/* <StatusBar style="auto" /> */}
    </Stack>
  );
}
