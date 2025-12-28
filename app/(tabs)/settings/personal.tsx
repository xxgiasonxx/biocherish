import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { InputsBox, InputsType } from '@/components/InputsBox';
import { useEffect, useState } from 'react';
import { Pressable, Text, Alert, Platform } from 'react-native';
import { useAuth } from '@/components/providers/AuthProviders';
import { useRouter } from 'expo-router';
import axios from 'axios';

const API_URL = Platform.select({
    web: process.env.EXPO_PUBLIC_WEB_API_URL,
    default: process.env.EXPO_PUBLIC_API_URL,
});


function PersonalPage() {
    const { onLogout } = useAuth();
    const router = useRouter();
    const [inputs, setInputs] = useState<InputsType[]>([
        { title: 'Username:', type: 'string', values: '', setting: true },
        { title: 'Email:', type: 'string', values: '', setting: true },
        { title: 'Password:', type: 'password', values: '', setting: true },
    ]);

    const confirmLogout = () => {
        if (Platform.OS === 'web') {
            if (window.confirm("您確定要登出嗎？")) {
                onLogout?.();
                router.replace('/SignIn');
            }
        } else {
            Alert.alert(
                "確認登出",
                "您確定要登出嗎？",
                [
                    { text: "取消", style: "cancel" },
                    { text: "登出", style: "destructive", onPress: async () => {
                        await onLogout?.();
                        router.replace('/SignIn');
                    }}
                ]
            );
        }
    }

    useEffect(() => {
        // 假設這裡會從某個 API 獲取用戶資料並更新 inputs 狀態
        const fetchUserData = async () => {
            const response = await axios.get(`${API_URL}/auth/userinfo`);
            const data = response.data;

            console.log("Fetched user data:", data);
            console.log(data.username, data.email);
        
            setInputs([
                { title: 'Username:', type: 'string', values: data['username'], setting: true },
                { title: 'Email:', type: 'string', values: data['email'], setting: true },
                { title: 'Password:', type: 'password', values: '', setting: true },
                { title: 'Reset Password:', type: 'password', values: '', setting: true },
            ]);
        }
        fetchUserData();
    }, []);

    const updateInfoHandle = async () => {
        try {
            const data = {
                Username: inputs[0].values,
                Email: inputs[1].values,
                Password: inputs[2].values,
                RePassword: inputs[3].values,
            }
            const response = await axios.post(`${API_URL}/auth/updateinfo`, data);
            if (response.status === 200) {
                Alert.alert("成功", "個人資訊已更新");
                if (Platform.OS === 'web') {
                    window.location.reload();
                } else {
                    router.replace('/(tabs)/settings/personal');
                }
            } else {
                Alert.alert("錯誤", "更新失敗，請稍後再試");
            }
        } catch (error) {
            console.error("Error updating user info:", error);
            Alert.alert("錯誤", "更新失敗，請稍後再試");
        }
    }

    return (
        <Main>
            <Section>
                <InputsBox
                    BigTitle="個人資訊輸入"
                    needed={inputs}
                    onChange={setInputs}
                />
                <Pressable
                    className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-2xl gap-5 mt-4 bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor'
                    accessibilityLabel="儲存個人資訊按鈕"
                    onPress={updateInfoHandle}
                >
                    <Text className='font-bold text-xl text-TextColor dark:text-DarkTextColor'>
                        儲存個人資訊
                    </Text>
                </Pressable>
                <Pressable
                    className='flex flex-row w-full items-center justify-center px-6 py-3 rounded-2xl gap-5 mt-4 bg-[#ec3e3e] dark:bg-[#a83232]'
                    accessibilityLabel="登出按鈕"
                    onPress={confirmLogout}
                >
                    <Text className='font-bold text-xl text-TextColor dark:text-DarkTextColor'>
                        登出
                    </Text>
                </Pressable>
            </Section>
        </Main>
    );
}

export default PersonalPage;