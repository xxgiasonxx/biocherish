import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ThemeProvider, ThemeContext } from '@/components/providers/ThemeProviders';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext } from 'react';
// import { View } from 'react-native';

export default function Layout() {
  const { color } = useContext(ThemeContext);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack
          // screenOptions={{
          //   headerBackButtonMenuEnabled: true,
          //   headerBackButtonDisplayMode: 'generic',
          //   headerStyle: {
          //     backgroundColor: color.TabbarBg,
          //   },
          //   headerTitleStyle: {
          //     color: color.TabbarColor,
          //   },
          //   headerTintColor: color.TabbarColor,
          //   headerTitleAlign: 'center',
          // }}
        >
          <Stack.Screen name="(tabs)" options={{
            headerShown: false
          }} />
          {/* <Stack.Screen name="SignIn" options={{ title: '登入' }} /> */}
          {/* <Stack.Screen name="SignUp" options={{ title: '註冊' }} /> */}
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
