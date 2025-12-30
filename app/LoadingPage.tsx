
import { Main } from '@/components/Main';
import { Section } from '@/components/Section';
import { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import LottieView from 'lottie-react-native';
import taxiAnimationJSON from 'animations/biocherish.json';





export function LoadingPage() {

    return (
        <View className="flex-1 flex-col w-full h-full items-center justify-center bg-Background dark:bg-DarkBackground" style={{ overflow: 'visible' }}>
            {/* <View className="flex w-full h-[40%] flex-col items-center justify-center" style={{ overflow: 'visible' }}> */}
                <LottieView
                    source={require('animations/biocherish.json')} // Use the imported JSON data
                    autoPlay // Automatically starts the animation
                    loop // Loops the animation indefinitely
                    style={{
                        width: '50%',
                        aspectRatio: 1, // 👈 如果動畫是正方形就設 1，長方形可試試 16/9
                        marginBottom: '25%',
                        overflow: 'visible',
                    }}
                    resizeMode="contain"
                />
            {/* </View> */}
        </View>
    );
}

export default LoadingPage;