import { Icon, Label, NativeTabs, Badge, VectorIcon } from 'expo-router/unstable-native-tabs';
import React, { useContext } from 'react';
// import { MaterialIcons } from '@expo/vector-icons';
// import {S} from '@expo/vector-icons'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';

import { ThemeContext } from '@/components/providers/ThemeProviders';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  const { color } = useContext(ThemeContext);

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
        {/* <Icon sf={{ default: 'apple.image.playground', selected: 'apple.image.playground.fill' }} drawable='ic_input_add' /> */}
        {/* {
          Platform.select({
            ios: <Icon sf={{ default: 'house', selected: 'house.fill' }} />,
            android: <MaterialIcons name='home' size={24} color={color.TabbarColor} />
          })
        } */}
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