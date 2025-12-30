import { Stack, useLocalSearchParams } from 'expo-router';
import { useContext } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import axios from 'axios';



export default function Layout() {
  const { color } = useContext(ThemeContext);


  return (
    <>
      <Stack
        screenOptions={{
          // headerBackButtonMenuEnabled: true,
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
          },
        }}
      >
        <Stack.Screen name="index" options={{
          title: '珍惜菌瓶',
        }} />
        <Stack.Screen name="[id]" options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="newEdge" options={{
          title: '新增邊緣',
        }} />
      </Stack>
    </>
  );
}
