import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { useRouter } from 'expo-router';



export function SignInPage() {
    const { color } = useContext(ThemeContext);

    const router = useRouter();

    useEffect(() => {
        // five seconds delay then navigate to home
        const timer = setTimeout(() => {
            router.replace('/home');
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <Main bgColor={color.Background}>
            <Section>
                <View className="flex w-full h-[40%] flex-col items-center justify-center">
                    <Text
                        className="text-[48px] font-bold text-TextColor dark:text-DarkTextColor"
                    >
                        登入成功
                    </Text>
                </View>
            </Section>
        </Main>
    );
}

export default SignInPage;