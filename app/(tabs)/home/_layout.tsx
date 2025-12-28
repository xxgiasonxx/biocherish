import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { MaterialCommunityIcons } from '@expo/vector-icons';



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
                {/* <Icon fill={color.TabbarColor} width={24} height={24} /> */}
                {/* <MaterialCommunityIcons name="mushroom" size={24} color={color.TabbarColor} style={{ marginRight: 8 }} /> */}
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
          title: '詳細資料',
        }} />
        <Stack.Screen name="newEdge" options={{
          title: '新增邊緣',
        }} />
      </Stack>
    </>
  );
}
