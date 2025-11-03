import { View } from "react-native";

export function Section({ children }: { children: React.ReactNode }) {
    return (
        <View className="flex-1 flex-row items-start justify-center px-[3%] py-[3%] gap-[6%]">
            <View className="flex-1 items-center justify-start gap-[10px]">
                {children}
            </View>
        </View>
    );
}
