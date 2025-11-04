import { Box } from '@/components/Box';
import { BioState, BioStateType } from '@/components/BioState';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useContext } from 'react';

export type HistoryItem = {
    id: string;
    status: BioStateType;
    stateText: string;
    date: string;
};

export type HistoryTableProps = {
    data: HistoryItem[];
}

export function HistoryaTable({ data }: HistoryTableProps) {
    const { color } = useContext(ThemeContext);

    return (
        <Box>
            <View className='flex w-full flex-row items-center justify-center'>
                <View className='flex-1 items-center justify-center'>
                    <Text
                        className='text-[20px] font-bold'
                        style={{
                            color: color.TextColor
                        }}
                    >
                        狀態
                    </Text>
                </View>

                <View className='flex-1 items-center justify-center'>
                    <Text
                        className='text-[20px] font-bold'
                        style={{
                            color: color.TextColor
                        }}
                    >
                        日期
                    </Text>
                </View>

                <View className='flex-1 items-center justify-center'>
                    <Text
                        className='text-[20px] font-bold'
                        style={{
                            color: color.TextColor
                        }}
                    >
                        詳情
                    </Text>
                </View>
            </View>
            <View
                className='h-[1px] w-full my-2'
                style={{ backgroundColor: color.TextColor }}
            />
            <View className='flex w-full flex-col gap-4 mb-3'>
                {data.map((item, index) => (
                    <View key={index} className='flex w-full flex-row items-center justify-center'>
                        <View className='flex-1 items-center justify-center'>
                            <BioState state={item.status} text={item.stateText} />
                        </View>

                        <View className='flex-1 items-center justify-center'>
                            <Text
                                className='text-[14px] font-bold'
                                style={{
                                    color: color.TextColor
                                }}
                            >
                                {item.date}
                            </Text>
                        </View>

                        <View className='flex-1 items-center justify-center'>
                            <MaterialCommunityIcons name='arrow-right-circle' size={24} color={color.TextIconColor} />
                        </View>
                    </View>
                ))}
            </View>
        </Box>
    );
}