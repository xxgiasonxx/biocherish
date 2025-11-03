import { useContext } from 'react';
import { Platform, View, ScrollView } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { Card, CardProps } from '@/components/Card';
import { SymbolView } from 'expo-symbols';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router'

const cardList: CardProps[] = [
  {
    id: "1203982109318230918",
    title: '菌瓶 A-01',
    state: 'good',
    stateText: '菌絲健康',
    lastModified: '2025/10/25 下午 03:57',
    lastDetected: '2025/10/25 下午 03:57',
  },
  {
    id: "1203982109318230919",
    title: '菌瓶 B-02',
    state: 'careful',
    stateText: '小心',
    lastModified: '2025/10/24 下午 02:30',
    lastDetected: '2025/10/24 下午 02:30',
  },
  {
    id: "1203982109318230920",
    title: '菌瓶 B-03',
    state: 'wrong',
    stateText: '菌絲異常',
    lastModified: '2025/10/24 下午 02:30',
    lastDetected: '2025/10/24 下午 02:30',
  },
  {
    id: "1203982109318230921",
    title: '菌瓶 B-03',
    state: 'wrong',
    stateText: '菌絲異常',
    lastModified: '2025/10/24 下午 02:30',
    lastDetected: '2025/10/24 下午 02:30',
  },
  {
    id: "1203982109318230922",
    title: '菌瓶 B-03',
    state: 'wrong',
    stateText: '菌絲異常',
    lastModified: '2025/10/24 下午 02:30',
    lastDetected: '2025/10/24 下午 02:30',
  },
  {
    id: "1203982109318230923",
    title: '菌瓶 B-03',
    state: 'wrong',
    stateText: '菌絲異常',
    lastModified: '2025/10/24 下午 02:30',
    lastDetected: '2025/10/24 下午 02:30',
  },
];

// import { SafeAreaView } from 'react-native-safe-area-context';
// --- Main Component ---
function HomePage() {
  const { color } = useContext(ThemeContext);

  return (
    // <View className={`flex-1 bg-[${color.Background}] w-full justify-center items-center`}>
    // <SafeAreaView>
    <>
      {/* <ScrollView
      style={{ flex: 1}}
       contentContainerStyle={
        {
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 100
        }
      }> */}

        <Main bgColor={color.Background}>
          <Section>
              {cardList.map((card, index) => (
                <Card key={index} id={card.id} title={card.title} state={card.state} stateText={card.stateText} lastModified={card.lastModified} lastDetected={card.lastDetected} />
              ))}
          </Section>
        </Main>

      {/* </ScrollView> */}

      <View className='absolute right-2 bottom-[13vh] flex items-center justify-center gap-3'>
        <View className='flex items-center justify-center rounded-3xl shadow-lg p-2' style={{ backgroundColor: color.PrimaryBtnColor }}>
          {Platform.select({
            ios: <SymbolView name="plus" size={50} weight="bold" scale="large" colors={color.TextIconColor} />,
            android: <MaterialIcons name="integration-instructions" size={50} color={color.TextIconColor} />,
          })}
        </View>
        <Link href={"/home/newEdge"} className='flex items-center justify-center rounded-3xl shadow-lg p-2 cursor-pointer' style={{ backgroundColor: color.PrimaryBtnColor }}>
          {Platform.select({
            ios: <SymbolView name="plus" size={50} weight="bold" scale="large" colors={color.TextIconColor} />,
            android: <MaterialCommunityIcons name="plus-circle-outline" size={50} color={color.TextIconColor} />,
          })}
        </Link>
      </View>
    </>
    // </SafeAreaView>
  );
};

export default HomePage;