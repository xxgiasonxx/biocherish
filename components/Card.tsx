import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { BioState } from "@/components/BioState";
import { TitleBar } from "@/components/TitleBar";
import { formatDate } from "@/lib/time";


export type CardProps = {
    id: string;
    name: string;
    bottle_status: 'good' | 'warning' | 'unknown';
    bottle_status_text: string;
    env_status: 'good' | 'warning' | 'unknown';
    env_status_text: string;
    isConnected: boolean;
    imageurl?: string;
    edited_at: number;
    scanned_at: number;
}

export function Card({ id, name, bottle_status, bottle_status_text, env_status, env_status_text, isConnected, imageurl, edited_at, scanned_at }: CardProps) {
    const connect = isConnected ? '已連線' : '未連線';
    const connectState = isConnected ? 'good' : 'warning';

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
                    <TitleBar title={name} />
                    <View className="flex-1 items-start gap-[5px]">
                        <View className="flex flex-row items-center justify-start gap-1">
                            {/* <Link href={}> */}
                            <BioState text={bottle_status_text} state={bottle_status} />
                            <BioState text={env_status_text} state={env_status} />
                            {/* </Link> */}
                        </View>
                    </View>
                    <View className="flex-1 items-start gap-[5px]">
                        <View className="flex flex-wrap items-center justify-start">
                            {/* <Link href={}> */}
                            <BioState text={connect} state={connectState} />
                            {/* </Link> */}
                        </View>
                    </View>
                    <View className="flex-1 flex-col items-center justify-end">
                        <Text className="w-full font-bold text-xs text-OpcTextColor dark:text-DarkOpcTextColor">
                            上次修改時間：{formatDate(edited_at)}
                        </Text>

                        <Text className="w-full font-bold text-xs text-OpcTextColor dark:text-DarkOpcTextColor">
                            上次偵測時間：{formatDate(scanned_at)}
                        </Text>
                    </View>
                </View>
                <View className="flex items-center justify-center px-[2%]">
                    <Image source={{ uri: (imageurl ?? 'https://via.placeholder.com/150') }} style={{ width: 150, height: 150, borderRadius: 20 }} />
                </View>

            </View>
        </Pressable>
    );
}