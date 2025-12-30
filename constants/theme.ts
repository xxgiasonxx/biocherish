/*
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export type colorType = {
  Background: string;
  BoxBackground: string;
  PrimaryBtnColor: string;
  SecBtnColor: string;
  IconColor: string;
  TextColor: string;
  ActiveColor: string;
  OpcTextColor: string;
  LineColor: string;
  TextIconColor: string;
  TabbarColor: string;
  TabbarBg: string;
}

export type fontType = {
  sans: string;
  serif: string;
  rounded: string;
  mono: string;
}

export type state = {
  good: string;
  warning: string;
  unknown: string;
}

export const States: state ={
  good: '#17cf1754',
  warning: '#ff000054',
  unknown: '#80808054',
};

// Colors used in the app
export const Colors: Record<string, colorType> = {
  light: {
    Background: '#f5f5f5',
    BoxBackground: '#ffffff',
    PrimaryBtnColor: '#17cf17',
    SecBtnColor: '#e5e7eb',
    IconColor: '#6B7280',
    TextColor: '#000000',
    ActiveColor: '#17cf1754',
    OpcTextColor: '#00000080',
    LineColor: '#0000004D',
    TextIconColor: '#000000',
    TabbarColor: '#000000',
    TabbarBg: '#ffffff',
  },
  dark: {
    Background: '#112111',
    BoxBackground: '#001f00',
    PrimaryBtnColor: '#076107',
    SecBtnColor: '#113211',
    IconColor: '#9AA1B0',
    TextColor: '#ffffff',
    ActiveColor: '#17cf1754',
    OpcTextColor: '#ffffff80',
    LineColor: '#00000066',
    TextIconColor: '#ffffff',
    TabbarColor: '#A1B4A1',
    TabbarBg: '#112811',
  },
};

// font families used in the app
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
