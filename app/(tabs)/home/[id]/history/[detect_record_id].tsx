import { RecentUpload } from '../index';
import { useLocalSearchParams } from 'expo-router';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { Platform } from 'react-native';

const API_URL = Platform.select({
  web: process.env.EXPO_PUBLIC_WEB_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
});

function DetailHistoryPage() {
    const { id, detect_record_id } = useLocalSearchParams<{ detect_record_id: string, id: string }>(); // 取得路由參數

    return (
        <Main>
            <Section>
                <RecentUpload id={detect_record_id} url={`${API_URL}/bottle/${id}/history/${detect_record_id}`} />
            </Section>
        </Main>
    );
}

export default DetailHistoryPage;