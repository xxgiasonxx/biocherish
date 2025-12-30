import { Main } from "@/components/Main";
import { Section } from "@/components/Section";
import { useEffect, useState } from "react";
import { Pressable, Text, Alert, Platform } from "react-native";
import { InputsBox, InputsType } from "@/components/InputsBox";
import axios from "axios";
import { useRouter } from "expo-router";
import LoadingPage from "@/app/LoadingPage";

const API_URL = Platform.select({
  web: process.env.EXPO_PUBLIC_WEB_API_URL,
  default: process.env.EXPO_PUBLIC_API_URL,
});

function NewEdgePage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [inputs, setInputs] = useState<InputsType[]>([
        { title: '裝置名稱:', type: 'string', values: '', setting: true },
        { title: 'wifi名稱:', type: 'string', values: '', setting: true },
        { title: 'wifi密碼:', type: 'password', values: '', setting: true },
        { title: '拍攝頻率:', type: 'string', values: '', setting: true },
    ]);

    const SubmitDeviceNameHandle = async () => {
        setIsLoading(true);
        try {
            if (inputs[0].values === '' || inputs[1].values === '' || inputs[2].values === '' || inputs[3].values === '') {
                Alert.alert('錯誤', '請填寫所有欄位');
                return;
            }

            const response = await axios.post(`${API_URL}/device/newDevice`, {
                name: inputs[0].values,
                wifiSSID: inputs[1].values,
                wifiPassword: inputs[2].values,
                detectFreq: inputs[3].values,
            });
            if (response.status !== 200) {
                Alert.alert('錯誤', '裝置建立失敗，請稍後再試');
                return;
            }
            Alert.alert('成功', '裝置建立成功！');
            router.push({
                pathname: '/(tabs)/home/newEdge/secondPage',
                params: { deviceId: response.data.device_id }
            });
        } catch (error) {
            console.error('Error submitting inputs:', error);
            Alert.alert('錯誤', '提交裝置資訊時發生錯誤，請稍後再試。');
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <Main>
            <Section>
                <InputsBox
                    BigTitle="裝置資訊輸入"
                    needed={inputs}
                    onChange={setInputs}
                />
                <Pressable
                    className="w-full h-12 rounded-2xl bg-PrimaryBtnColor dark:bg-DarkPrimaryBtnColor flex items-center justify-center mt-4"
                    onPress={SubmitDeviceNameHandle}
                >
                    <Text className="text-lg font-bold text-TextColor dark:text-DarkTextColor">
                        提交裝置名稱
                    </Text>
                </Pressable>
                
            </Section>
        </Main>
    )
}

export default NewEdgePage;
