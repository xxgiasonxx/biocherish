import { Platform, View } from 'react-native';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { Card, CardProps } from '@/components/Card';
import { SymbolView } from 'expo-symbols';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router'
import { cssInterop } from 'nativewind';
import { useEffect, useState } from 'react';
import axios from 'axios';


const API_URL = process.env.EXPO_PUBLIC_API_URL;



function HomePage() {
  const [cardList, setCardList] = useState<CardProps[]>([]);

  // useEffect(() => {
  //   const fetchCardList = async () => {
  //     try {
  //       const response = await axios.get(`${API_URL}/bottle`);

  //       if (response.status !== 200) {
  //         console.error('Failed to fetch card list:', response.status);
  //         return;
  //       }

  //       response.data?.bottles?.forEach((bottle: CardProps) => {
  //         setCardList(prevList => [...prevList, bottle]);
  //       });
      
  //     } catch (error) {
  //       console.error('Error in fetchCardList:', error);
  //     }
  //   };
  //   fetchCardList();
  // }, []);

  useEffect(() => {
    setCardList([
      {
        id: '1',
        name: '菌瓶 A',
        bottle_status: 'good',
        bottle_status_text: '一切正常',
        env_status: "good",
        env_status_text: 'dasjkda',
        isConnected: true,
        imageurl: 'https://placehold.co/600x400.png',
        edited_at: 1711929600000,
        scanned_at: 1712016000000,
      },
    ]);
  }, []);

  return (
    <>
      <Main>
        <Section>
            {cardList.map((card, index) => (
              <Card key={index} {...card} />
            ))}
            {
              cardList.length === 0 && (
                <View className='flex items-center justify-center py-10'>
                  <MaterialIcons name="cloud-off" size={50} className='text-TextIconColor dark:text-DarkTextIconColor mb-4' />
                  <View className='text-TextColor dark:text-DarkTextColor'>尚無任何菌瓶資料，請點擊右下角按鈕新增。</View>
                </View>
              )
            }
        </Section>
      </Main>

      {/* </ScrollView> */}

      <View className='absolute right-2 bottom-[13vh] flex items-center justify-center gap-3'>
        <View className='flex items-center justify-center rounded-3xl shadow-lg p-2 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'>
          {Platform.select({
            ios: <SymbolView name="plus" size={50} weight="bold" scale="large" className='text-TextIconColor dark:text-DarkTextIconColor' />,
            android: <MaterialIcons name="integration-instructions" size={50} className='text-TextIconColor dark:text-DarkTextIconColor' />,
          })}
        </View>
        <Link href={"/home/newEdge"} className='flex items-center justify-center rounded-3xl shadow-lg p-2 cursor-pointer bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'>
          {Platform.select({
            ios: <SymbolView name="plus" size={50} weight="bold" scale="large" className='text-TextIconColor dark:text-DarkTextIconColor' />,
            android: <MaterialCommunityIcons name="plus-circle-outline" size={50} className='text-TextIconColor dark:text-DarkTextIconColor' />,
          })}
        </Link>
      </View>
    </>
    // </SafeAreaView>
  );
};

export default HomePage;

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
  },
});

cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style',
  },
});

cssInterop(SymbolView, {
  className: {
    target: 'style',
  },
});