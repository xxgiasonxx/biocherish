import { View, Text } from "react-native";
import { States } from "@/constants/theme";
import { useContext } from "react";
import { ThemeContext } from "@/components/providers/ThemeProviders";

export type BioStateProps = {
    text: string;
    state: 'good' | 'careful' | 'wrong' | 'unknown';
};

export type BioStateType = 'good' | 'careful' | 'wrong' | 'unknown';

export function BioState({ text, state }: BioStateProps) {
    const { color } = useContext(ThemeContext)

    return (
        <View className="flex items-center justify-center py-1 px-3 rounded-3xl" style={{ backgroundColor: States[state] }}>
            <Text className=" font-normal" style={{ color: color.TextColor }}>
                {text}
            </Text>
        </View>
    );
}