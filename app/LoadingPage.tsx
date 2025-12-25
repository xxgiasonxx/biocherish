
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';



export function LoadingPage() {
    const { color } = useContext(ThemeContext);

    return (
        <Main bgColor={color.Background}>
            <Section>
                <View className="flex w-full h-[40%] flex-col items-center justify-center">
                    <Text
                        className="text-[48px] font-bold text-TextColor dark:text-DarkTextColor"
                    >
                        載入中...
                    </Text>
                </View>
            </Section>
        </Main>
    );
}

export default LoadingPage;