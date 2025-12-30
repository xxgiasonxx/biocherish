import { Platform, View, Text } from 'react-native';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { Card, CardProps } from '@/components/Card';
import { SymbolView } from 'expo-symbols';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router'
import { cssInterop } from 'nativewind';
import { useEffect, useState } from 'react';
import { LoadingPage } from '@/app/LoadingPage';
import axios from 'axios';


const API_URL = Platform.select({
  web: process.env.EXPO_PUBLIC_WEB_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
});


function HomePage() {
  const [cardList, setCardList] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCardList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/bottle/`);

      if (response.status !== 200) {
        console.error('Failed to fetch card list:', response.status);
        return;
      }

      // response.data?.bottles?.forEach((bottle: CardProps) => {
      //   setCardList(prevList => [...prevList, bottle]);
      // });
      setCardList(response.data?.bottles || []);


    
    } catch (error) {
      console.error('Error in fetchCardList:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardList();
  }, []);

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <>
      <Main onRefresh={fetchCardList}>
        <Section>
            {cardList.map((card, index) => (
              <Card key={index} {...card} />
            ))}
            {
              cardList.length === 0 && (
                <View className='flex items-center justify-center py-10'>
                  <MaterialIcons name="cloud-off" size={50} className='text-TextIconColor dark:text-DarkTextIconColor mb-4' />
                  <Text className='text-TextColor dark:text-DarkTextColor'>尚無任何菌瓶資料，請點擊右下角按鈕新增。</Text>
                </View>
              )
            }
        </Section>
      </Main>

      {/* </ScrollView> */}

      <View className='absolute right-2 md:right-8 bottom-[13vh] md:bottom-20 flex items-center justify-center gap-3'>

        <Link href={"/home/newEdge"} className='flex items-center justify-center rounded-3xl shadow-lg p-2 md:p-3 cursor-pointer bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor hover:opacity-80 transition-opacity'>
          {Platform.select({
        ios: <SymbolView name="plus" size={50} weight="bold" scale="large" className='text-TextIconColor dark:text-DarkTextIconColor' />,
        android: <MaterialCommunityIcons name="plus-circle-outline" size={50} className='text-TextIconColor dark:text-DarkTextIconColor' />,
        web: <MaterialCommunityIcons name="plus-circle-outline" size={50} className='text-TextIconColor dark:text-DarkTextIconColor' />,
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