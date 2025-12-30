
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';



export default function Layout() {
  const { color } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen name="[detect_record_id]" options={{
      }} />
      <StatusBar style="auto" />
    </Stack>
  );
}