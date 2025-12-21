import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BioState } from "@/components/BioState";
import { TitleBar } from "@/components/TitleBar";


export type CardProps = {
    id: string;
    title: string;
    imageurl?: string;
    state: 'good' | 'careful' | 'wrong' | 'unknown';
    stateText: string;
    lastModified: string;
    lastDetected: string;
}

export function Card({ id, title, imageurl, state, stateText, lastModified, lastDetected }: CardProps) {
    return (
        <Pressable onPress={() => router.push(`/home/${id}`)}>
            <View className={`flex flex-row min-h-48 w-full justify-between items-center rounded-[20px] shadow p-[15px] bg-BoxBackground dark:bg-DarkBoxBackground`}>
                <View className="flex flex-col items-start justify-start px-[10px]">
                    {/* <View className="flex-1 w-full flex-row items-start justify-start gap-[10px]">
                    <View className="flex justify-center h-full">
                        <Text className="text-[24px] font-bold" style={{ color: color.TextColor }}>
                            {title}
                        </Text>
                    </View>
                    <View className="flex justify-center h-full">
                        <FontAwesome6 name="edit" size={20} color={color.TextIconColor} />
                    </View>
                </View> */}
                    <TitleBar title={title} />
                    <View className="flex-1 items-start gap-[5px]">
                        <View className="flex items-center justify-start">
                            {/* <Link href={}> */}
                            <BioState text={stateText} state={state} />
                            {/* </Link> */}
                        </View>
                    </View>
                    <View className="flex-1 flex-col items-center justify-end">
                        <Text className="w-full font-bold text-xs text-OpcTextColor dark:text-DarkOpcTextColor">
                            上次修改時間：{lastModified}
                        </Text>

                        <Text className="w-full font-bold text-xs text-OpcTextColor dark:text-DarkOpcTextColor">
                            上次偵測時間：{lastDetected}
                        </Text>
                    </View>
                </View>
                <View className="flex items-center justify-center px-[2%]">
                    <Image source={{ uri: (imageurl ? imageurl : 'https://via.placeholder.com/150') }} />
                </View>

            </View>
        </Pressable>
    );
}