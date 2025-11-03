import { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { SelectBar } from '@/components/SelectBar';
import { DisplayUpload } from '@/components/DisplayUpload';
// import { SafeAreaView } from 'react-native-safe-area-context';
// --- Main Component ---
function DetailPage() {
  const { id } = useLocalSearchParams(); // 取得路由參數
  const { color } = useContext(ThemeContext);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const page: string[] = ['最近上傳', '紀錄', '裝置設定'];


  return (
    // <View className={`flex-1 bg-[${color.Background}] w-full justify-center items-center`}>
    <Main bgColor={color.Background}>
      <Section>
          {/* toggle bar*/}
         <SelectBar
           barItems={page}
           onSelect={(value) => setSelectedValue(value)}
         />

          {selectedValue === 0 && <RecentUpload />}
          {selectedValue === 1 && <History />}
          {selectedValue === 2 && <DeviceSettings />}
      </Section>
    </Main>
  );
};

function RecentUpload() {
  return (
    <DisplayUpload title="Recent Upload" />
  );
}

function History() {
  return (
    <Text>History</Text>
  );
}

function DeviceSettings() {
  return (
    <Text>Device Settings</Text>
  );
}



export default DetailPage;