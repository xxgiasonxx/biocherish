import { View, Text } from "react-native";
import { States } from "@/constants/theme";

export type BioStateProps = {
    text: string;
    state: 'good' | 'warning' | 'unknown';
};

export type BioStateType = 'good' | 'warning' | 'unknown';

export function BioState({ text, state }: BioStateProps) {
    return (
        <View className="flex items-center justify-center py-1 px-3 rounded-3xl" style={{ backgroundColor: States[state] }}>
            <Text className=" font-normal text-TextColor dark:text-DarkTextColor">
                {text}
            </Text>
        </View>
    );
}