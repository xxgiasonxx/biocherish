import { Platform, View } from "react-native";

export function Section({ children }: { children: React.ReactNode }) {

    // if (Platform.OS === 'web') {
    //     return (
    //         <View className="flex-1 flex-row items-start justify-center px-[3%] py-[3%] gap-[6%]">
    //             <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]">
    //                 {children}
    //             </View>
    //         </View>
    //     );
    // }
    if (Platform.OS === 'web') {
        return (
            <View className="flex-1 w-full flex-wrap items-center justify-center px-[3%] py-[3%] gap-[6%]">
                {/* {Platform.OS === 'web' ? (
                <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]">
                    {children}
                </View>
            ) : ( */}
                <View className="flex-1 flex-wrap items-center justify-center gap-[10px]">
                    {children}
                </View>
                {/* )} */}
            </View>
        );
    }

    return (
        <View className="flex-1 flex-row items-start justify-center px-[3%] py-[3%] gap-[6%]">
            {/* {Platform.OS === 'web' ? (
                <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]">
                    {children}
                </View>
            ) : ( */}
                <View className="flex-1 items-center justify-start gap-[10px]">
                    {children}
                </View>
            {/* )} */}
        </View>
    );
}
