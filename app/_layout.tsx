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
  const { authState } = useAuth();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          authState?.authenticated ? (
            <Stack.Screen name="(tabs)" options={{
              headerShown: false
            }} />
          ) : (
              <Stack.Screen name="SignIn" options={{ 
                headerShown: false,
              }} />
          )
        }
      </Stack>
    </>
  );
}
