/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './constants/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
    colors: {
      Background: '#F5F5F5',
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

      // Dark Mode Colors
      DarkBackground: '#112111',
      DarkBoxBackground: '#001f00',
      DarkPrimaryBtnColor: '#076107',
      DarkSecBtnColor: '#113211',
      DarkIconColor: '#9AA1B0',
      DarkTextColor: '#ffffff',
      DarkActiveColor: '#17cf1754',
      DarkOpcTextColor: '#ffffff80',
      DarkLineColor: '#00000066',
      DarkTextIconColor: '#ffffff',
      DarkTabbarColor: '#A1B4A1',
      DarkTabbarBg: '#112811',

    }
  },
  plugins: [],
};
