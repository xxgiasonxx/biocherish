import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { Text, Pressable, Platform, Alert, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

  const recentUploadRef = useRef<{ refresh: () => Promise<void> } | null>(null);
  const historyRef = useRef<{ refresh: () => Promise<void> } | null>(null);
  const deviceSettingsRef = useRef<{ refresh: () => Promise<void> } | null>(null);

  const onRefresh = async () => {
    // 同時觸發所有子組件暴露出來的 refresh 函式
    await Promise.all([
      recentUploadRef.current?.refresh(),
      historyRef.current?.refresh(),
      deviceSettingsRef.current?.refresh()
    ]);
  };


  return (
    // <View className={`flex-1 bg-[${color.Background}] w-full justify-center items-center`}>
    <Main onRefresh={onRefresh}>
      <Section>
          {/* toggle bar*/}
         <SelectBar
           barItems={page}
           onSelect={(value) => setSelectedValue(value)}
         />

          {selectedValue === 0 && <RecentUpload ref={recentUploadRef} id={id} url={`${API_URL}/bottle/${id}`} />}
          {selectedValue === 1 && <History ref={historyRef} id={id} />}
          {selectedValue === 2 && <DeviceSettings ref={deviceSettingsRef} id={id} />}

      </Section>
    </Main>
  );
};

export const RecentUpload = forwardRef(({ id, url }: { id: string, url: string }, ref) => {
  const [displayState, setDisplayState] = useState<DisplayUploadProps | null>(null);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
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
      console.log('Fetched recent upload data:', data);
      const displayData: DisplayUploadProps = {
        detect_state_id: data.detect_state_id,
        name: data.name,
        displayState: data.displayState,
        bottleState: data.bottleState,
        envState: data.envState,
        oriimageUri: data.oriimageUri,
        AIimageUri: data.AIimageUri,
        isError: data.isError ?? false,
      };
      setDisplayState(displayData);
    } catch (error) {
      console.error('Error in RecentUpload:', error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, [id]);


  useImperativeHandle(ref, () => ({
    refresh: fetchData
  }));

  if (loading) {
    return (
      <View className="mt-[40%]">
        <LoadingPage />
      </View>
    )
  }

  if (!displayState) {
    return <Text className='text-TextColor dark:text-DarkTextColor'>無最近上傳資料</Text>;
  }

  return (
    <DisplayUpload {...displayState} />
  );
})

export const History = forwardRef(({ id }: { id: string }, ref) => {
  const [testData, setTestData] = useState<HistoryItem[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const maxItemsPerPage = 10;


  const fetchTotalPages = async () => {
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

  const fetchHistory = async () => {
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

  useEffect(() => {
    fetchTotalPages();
  }, [id, totalPage]);


  useEffect(() => {
    fetchHistory();
  }, [id, currentPage]);

  useImperativeHandle(ref, () => ({
    refresh: async () => {
      await fetchTotalPages();
      await fetchHistory();
    }
  }));

  if (loading) {
    return (
      <View className="mt-[40%]">
        <LoadingPage />
      </View>
    )
  }

  if (testData.length === 0)
    return (
      <Text>無歷史紀錄資料</Text>
    );

  return (
    <HistoryTable data={testData} totalPage={totalPage} maxItemsPerPage={maxItemsPerPage} currentPage={currentPage} setPage={setCurrentPage} />
  )
})

const DeviceSettings = forwardRef(({ id }: { id: string }, ref) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<InputsType[]>([
    { title: '裝置ID:', type: 'number', values: '', setting: false },
    { title: '裝置名稱:', type: 'string', values: 'e04', setting: true},
    { title: '每次拍攝時間:', type: 'number', values: 30, setting: true },
  ]);


  const fetchDeviceSettings = async () => {
    setLoading(true);
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
        { title: '裝置名稱:', type: 'string', values: data.name, setting: true },
        { title: '每次拍攝時間:', type: 'number', values: data.detectFreq, setting: true },
      ]);
    } catch (error) {
      console.error('Error in fetchDeviceSettings:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeviceSettings();
  }, [id]);

  useImperativeHandle(ref, () => ({
    refresh: fetchDeviceSettings
  }));

  const changeSubmitHandle = async (newInputs: InputsType[]) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
  const alertDelete = () => {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm('確定要刪除此菌瓶及其裝置嗎？此操作無法復原。');
      if (confirmDelete) {
        deleteSubmitHandle();
      }
      return;
    }
    Alert.alert(
      '確認刪除',
      '確定要刪除此菌瓶及其裝置嗎？此操作無法復原。',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '刪除',
          style: 'destructive',
          onPress: () => deleteSubmitHandle(),
        },
      ],
      { cancelable: true }
    );
  }

  const deleteSubmitHandle = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/bottle/${id}`);
      if (response.status !== 200) {
        console.error('Failed to delete device:', response.status);
        alert('刪除失敗，請稍後再試。');
        return;
      }
      alert('裝置及菌瓶已刪除！');
      router.back();
    } catch (error) {
      console.error('Error deleting device:', error);
      alert('刪除裝置時發生錯誤，請稍後再試。');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View className="mt-[40%]">
        <LoadingPage />
      </View>
    )
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

      <Pressable
        className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-2xl gap-5 mt-4 bg-[#d84242] dark:bg-[#a83232]'
        onPress={() => alertDelete()}
      >
        <Text className='font-bold text-xl text-TextColor dark:text-DarkTextColor'>
          刪除菌瓶及裝置
        </Text>
      </Pressable>
    </>
  );
})



export default DetailPage;