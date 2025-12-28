import { Icon, Label, NativeTabs, Badge, VectorIcon } from 'expo-router/unstable-native-tabs';
import React, { useContext } from 'react';
// import { MaterialIcons } from '@expo/vector-icons';
// import {S} from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '@/components/providers/ThemeProviders';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { color } = useContext(ThemeContext);

  if (Platform.OS === 'web') {
    return (
  <Tabs
    screenOptions={{
      // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      // tabBarButton: HapticTab,
      tabBarStyle: {
        backgroundColor: color.TabbarBg,
      },
      tabBarActiveTintColor: color.ActiveColor,
      tabBarInactiveTintColor: color.TabbarColor,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '800',
      },
    }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={28} />,
          }}
        />
        <Tabs.Screen
          name="uploads"
          options={{
            title: 'Uploads',
            tabBarIcon: ({ color }) => <MaterialIcons name="upload" color={color} size={28} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <MaterialIcons name="settings" color={color} size={28} />,
          }}
        />
      </Tabs>
    );
  }

  return (
    <NativeTabs 
      backgroundColor={color.TabbarBg}
      labelStyle={{
        fontSize: 12,
        fontWeight: '800',
        color: color.TabbarColor,
      }}
      // shadowColor={"#fff"}
      tintColor={
        color.TabbarColor
      }
      iconColor={
        color.TabbarColor
      }
      indicatorColor={color.ActiveColor}
      labelVisibilityMode='selected'
      minimizeBehavior="onScrollDown"
    >

      <NativeTabs.Trigger name='home'>
        <Label>home</Label>

          <Icon sf={{ default: 'house', selected: 'house.fill' }} src={{ default: <VectorIcon family={MaterialIcons} name='home' />, selected: <VectorIcon family={MaterialIcons} name='home' /> }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='uploads'>
        <Label>uploads</Label>

          <Icon sf={{ default: 'apple.image.playground', selected: 'apple.image.playground.fill' }} drawable='ic_menu_report_image' />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='settings'>
        <Label>settings</Label>
          <Icon sf={{ default: 'apple.image.playground', selected: 'apple.image.playground.fill' }} src={{ default: <VectorIcon family={MaterialIcons} name='settings' />, selected: <VectorIcon family={MaterialIcons} name='settings' /> }} />
      </NativeTabs.Trigger>

    </NativeTabs>


    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //   }}>
    //   <Tabs.Screen
    //     name="home"
    //     options={{
    //       title: 'AI',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="apple.image.playground.fill" color={color} />,
    //     }}
    //   />
    //   {/* <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    //     }}
    //   /> */}
    // </Tabs>
  );
}