import { Stack } from 'expo-router';

export default function Layout() {

  return (
    <>
      <Stack
        screenOptions={{
          // headerBackButtonMenuEnabled: true,
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{
        }} />
        <Stack.Screen name="secondPage" options={{
        }} />
      </Stack>
    </>
  );
}

