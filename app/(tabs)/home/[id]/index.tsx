import { useContext, useState, useEffect } from 'react';
import { Text, View, Pressable, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { SelectBar } from '@/components/SelectBar';
import { DisplayUploadProps, DisplayUpload } from '@/components/DisplayUpload';
import { HistoryTable, HistoryItem } from '@/components/HistoryTable';
import { InputsBox, InputsType } from '@/components/InputsBox';
import axios from 'axios';
import { LoadingPage } from '@/app/LoadingPage';

// import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = Platform.select({
  web: process.env.EXPO_PUBLIC_WEB_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
});

// --- Main Component ---
function DetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>(); // 取得路由參數
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const page: string[] = ['最近上傳', '紀錄', '裝置設定'];


  return (
    // <View className={`flex-1 bg-[${color.Background}] w-full justify-center items-center`}>
    <Main>
      <Section>
          {/* toggle bar*/}
         <SelectBar
           barItems={page}
           onSelect={(value) => setSelectedValue(value)}
         />

          {selectedValue === 0 && <RecentUpload id={id} url={`${API_URL}/bottle/${id}`} />}
          {selectedValue === 1 && <History id={id} />}
          {selectedValue === 2 && <DeviceSettings id={id} />}
      </Section>
    </Main>
  );
};

export function RecentUpload({ id, url }: { id: string, url: string }) {
  const [displayState, setDisplayState] = useState<DisplayUploadProps | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get(url);
        if (response.status === 404) {
          setDisplayState(null);
          console.log('No bottle state found');
          return;
        }

        if (response.status !== 200) {
          console.error('Failed to fetch recent upload data:', response.status);
          setDisplayState(null);
          return;
        }
        
        const data = response.data;
        const displayData: DisplayUploadProps = {
          detect_state_id: data.detect_state_id,
          name: data.name,
          displayState: data.displayState,
          bottleState: data.bottleState,
          envState: data.envState,
          oriimageUri: data.oriimageUri,
          AIimageUri: data.AIimageUri,
        };
        setDisplayState(displayData);
      } catch (error) {
        console.error('Error in RecentUpload:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!displayState) {
    return <Text className='text-TextColor dark:text-DarkTextColor'>無最近上傳資料</Text>;
  }

  return (
    <DisplayUpload {...displayState} />
  );
}

function History({ id }: { id: string }) {
  const [testData, setTestData] = useState<HistoryItem[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const maxItemsPerPage = 10;

  useEffect(() => {
    async function fetchTotalPages() {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/bottle/${id}/total`);
        if (response.status !== 200) {
          console.error('Failed to fetch total history count:', response.status);
          return;
        }
        const totalCount = response.data.total_scans;
        setTotalPage(Math.ceil(totalCount / maxItemsPerPage));
      } catch (error) {
        console.error('Error in fetchTotalPages:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTotalPages();
  }, [id, totalPage]);

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      const s = (currentPage - 1) * maxItemsPerPage;
      const e = s + maxItemsPerPage;
      try {
        const response = await axios.get(`${API_URL}/bottle/${id}/history?s=${s}&e=${e}`);
        if (response.status !== 200) {
          console.error('Failed to fetch history data:', response.status);
          return;
        }
        const data = response.data;
        setTestData(data.history.map((item: any) => ({
          id: item.id,
          status: item.status,
          status_text: item.status_text,
          details: item.detail,
          scanned_at: item.scanned_at,
        })));
      } catch (error) {
        console.error('Error in fetchHistory:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, [id, currentPage]);


  if (loading) 
    return (
      <Text>Loading...</Text>
    );

  if (testData.length === 0)
    return (
      <Text>無歷史紀錄資料</Text>
    );

  return (
    <HistoryTable data={testData} totalPage={totalPage} maxItemsPerPage={maxItemsPerPage} currentPage={currentPage} setPage={setCurrentPage} />
  )
}

function DeviceSettings({ id }: { id: string }) {
  const [inputs, setInputs] = useState<InputsType[]>([
    { title: '裝置ID:', type: 'number', values: '', setting: false },
    { title: '裝置名稱:', type: 'string', values: 'e04', setting: true},
    { title: '每次拍攝時間:', type: 'number', values: 30, setting: true },
  ]);


  useEffect(() => {
    async function fetchDeviceSettings() {
      try {
        const response = await axios.post(`${API_URL}/device/getDevice`,
          { bottle_id: id }
        );
        if (response.status !== 200) {
          console.error('Failed to fetch device settings:', response.status);
          return;
        }
        const data = response.data;
        setInputs([
          { title: '裝置ID:', type: 'number', values: data.device_id, setting: false },
          { title: '裝置名稱:', type: 'string', values: data.name, setting: true},
          { title: '每次拍攝時間:', type: 'number', values: data.detectFreq, setting: true },
        ]);
      } catch (error) {
        console.error('Error in fetchDeviceSettings:', error);
      }
    }
    fetchDeviceSettings();
  }, [id]);

  const changeSubmitHandle = async (newInputs: InputsType[]) => {
    try {
      const response = await axios.put(`${API_URL}/device/updateDevice?device_id=${newInputs[0].values}&name=${newInputs[1].values}&freq=${newInputs[2].values}`);

      if (response.status !== 200) {
        console.error('Failed to submit device settings:', response.status);
        alert('儲存設定失敗，請稍後再試。');
        return;
      } 


      alert('設定已儲存！');
    } catch (error) {
      console.error('Error submitting device settings:', error);
      alert('儲存設定時發生錯誤，請稍後再試。');
    }
  }

  return (
    <>
      <InputsBox BigTitle='裝置' needed={inputs} onChange={setInputs} />
      <Pressable
        className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-2xl gap-5 mt-4 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
        onPress={() => changeSubmitHandle(inputs)}
      >
        <Text className='font-bold text-xl text-TextColor dark:text-DarkTextColor'>
          儲存設定
        </Text>
      </Pressable>
    </>
  );
}



export default DetailPage;