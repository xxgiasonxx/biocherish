import { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { SelectBar } from '@/components/SelectBar';
import { DisplayUpload, DisplayStateProps } from '@/components/DisplayUpload';
import { HistoryaTable, HistoryItem } from '@/components/HistoryTable';
import { InputsBox, InputsType } from '@/components/InputsBox';
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
  const displayState: DisplayStateProps = {
    state: 'good',
    stateText: '一切正常',
    description: '植物狀態良好，請繼續保持適當的澆水和光照。',
    suggestion: '建議每週檢查一次植物狀態，確保其健康成長。',
    temperature: '24°C',
    humidity: '60%',
    time: new Date(),
  };

  return (
    <DisplayUpload title="Recent Upload" displayState={displayState} />
  );
}

function History() {
  const testData: HistoryItem[] = [
    { id: '1', status: 'good', stateText: '一切正常', date: '2024-01-01' },
    { id: '2', status: 'wrong', stateText: '注意事項', date: '2024-01-02' },
    { id: '3', status: 'careful', stateText: '需要關注', date: '2024-01-03' },
  ];

  return (
    <HistoryaTable data={testData} />
  )
}

function DeviceSettings() {
  const [inputs, setInputs] = useState<InputsType[]>([
    { title: '裝置ID:', type: 'number', values: '' },
    { title: '每次拍攝時間:', type: 'number', values: '' },
  ]);
  return (
    <InputsBox BigTitle='裝置' needed={inputs} onChange={setInputs} />
  );
}



export default DetailPage;