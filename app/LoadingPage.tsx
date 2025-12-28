
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import LottieView from 'lottie-react-native';
import taxiAnimationJSON from 'animations/biocherish.json';





export function LoadingPage() {
    const { color } = useContext(ThemeContext);

    return (
        <Main bgColor={color.Background}>
            <Section>
                <View className="flex w-full h-[40%] flex-col items-center justify-center">
                    <LottieView
                        source={taxiAnimationJSON} // Use the imported JSON data
                        autoPlay // Automatically starts the animation
                        loop // Loops the animation indefinitely
                    />
                </View>
            </Section>
        </Main>
    );
}

export default LoadingPage;