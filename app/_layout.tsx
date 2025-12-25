import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ThemeProvider} from '@/components/providers/ThemeProviders';
import { AuthProvider, useAuth } from '@/components/providers/AuthProviders';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { View } from 'react-native';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export const Layout = () => {

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Content />
      </Stack>
    </>
  );
}


const Content = () => {
  const { authState, isLoading } = useAuth();
  console.log("Layout authState:", authState?.authenticated);

  if (isLoading) {
    return (
      <Stack.Screen name="Loading" options={{
        headerShown: false
      }} />
    );
  }

  if (!authState?.authenticated) {
    return (
      <Stack.Screen name="SignIn" options={{
        headerShown: false
      }} />
    );
  }
  
  return (
    <Stack.Screen name="(tabs)" options={{
      headerShown: false
    }} />
  );
}