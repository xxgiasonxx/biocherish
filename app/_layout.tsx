import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@/components/providers/ThemeProviders';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { useContext } from 'react';
// import { View } from 'react-native';

export default function Layout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: false
          }} />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
