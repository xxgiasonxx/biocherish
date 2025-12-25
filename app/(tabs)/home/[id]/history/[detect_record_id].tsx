import { RecentUpload } from '../index';
import { useLocalSearchParams } from 'expo-router';
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';

function DetailHistoryPage() {
    const { detect_record_id } = useLocalSearchParams<{ detect_record_id: string }>(); // 取得路由參數

    return (
        <Main>
            <Section>
                <RecentUpload id={detect_record_id} />
            </Section>
        </Main>
    );
}

export default DetailHistoryPage;