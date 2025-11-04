import { View, Text, Image, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/components/providers/ThemeProviders';
import { FontAwesome6 } from '@expo/vector-icons';
import { TitleBar } from '@/components/TitleBar';
import { BioState, BioStateType } from '@/components/BioState';
import { formatDate } from '@/lib/time';


export type DisplayUploadProps = {
    title: string;
    displayState: DisplayStateProps;
}

export type DisplayStateProps = {
    state: BioStateType;
    stateText: string;
    description: string;
    suggestion: string;
    temperature: string;
    humidity: string;
    time: Date;
}

type ChoiceImageProps = {
    uri: string;
    AIuri: string;
}



export function DisplayUpload({ title, displayState }: DisplayUploadProps) {
    const { color } = useContext(ThemeContext);
    const uri = 'https://placehold.co/600x400.png';
    const AIuri = 'https://placehold.co/700x800.png';

    return (
        <View 
        className='flex flex-col w-full items-center justify-start rounded-3xl gap-2 p-6'
        style={{
            backgroundColor: color.BoxBackground,
        }}
        >

            {/* title bar */}
            <TitleBar title={title} />

            {/** original or ai image selection */}
            <ChoiceImage uri={uri} AIuri={AIuri} />

            {/** display state */}
            <DisplayState {...displayState} />

        </View>
    );
}

function ChoiceImage({ uri, AIuri }: ChoiceImageProps) {
    const { color } = useContext(ThemeContext);
    const [selected, setSelected] = useState<number>(1);
    const [ratio, setRatio] = useState<number>(1);

    useEffect(() => {
        Image.getSize((selected === 0 ? uri : AIuri), (width, height) => {
            setRatio(width / height);
        });
    });


    return (
        <>
            <View className="w-full items-center justify-center px-3 mb-2">
                <Image
                    source={{
                        uri: selected === 0 ? uri : AIuri
                    }}
                    resizeMode="contain"
                    className="w-full"
                    style={{
                        aspectRatio: ratio
                    }}
                />
            </View>
            <View className='flex flex-row w-full items-center justify-center gap-4 px-3'>
                <Pressable
                    onPress={() => {
                        setSelected(0);
                    }}
                    className='flex-1 items-center py-2 px-4 rounded-3xl'
                    style={{
                        backgroundColor: selected === 0 ? color.ActiveColor : color.SecBtnColor,
                    }}>
                    <Text
                        className='font-bold text-[20px]'
                        style={{
                            color: color.TextColor,
                        }}
                    >
                        原圖
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setSelected(1);
                    }}
                    className='flex-1 items-center py-2 px-4 rounded-3xl'
                    style={{
                        backgroundColor: selected === 1 ? color.ActiveColor : color.SecBtnColor,
                    }}>
                    <Text
                        className='font-bold text-[20px]'
                        style={{
                            color: color.TextColor,
                        }}
                    >
                        AI 偵測圖
                    </Text>
                </Pressable>
            </View>
        </>
    );
}

export type DisplayStateType = 'obj' | 'text' | 'round';


function DisplayState(props: DisplayStateProps) {
    const { color } = useContext(ThemeContext);

    const titleLists: {
        title: string,
        type: DisplayStateType,
        state?: string,
        bioState?: BioStateType,
        bioText?: string
    }[] = [
            { title: '狀態：', type: 'obj', bioState: props.state, bioText: props.stateText },
            { title: '描述：', type: 'text', state: props.description },
            { title: '建議：', type: 'text', state: props.suggestion },
            { title: '溫度 (°C)：', type: 'round', state: props.temperature },
            { title: '濕度 (%RH)：', type: 'round', state: props.humidity },
            { title: '上次偵測時間：', type: 'round', state: formatDate(props.time) },
    ];


    return (
        <View className="flex w-full flex-col items-start px-3 gap-3 shadow-black">

                {titleLists.map((item, index) => {
                    return (
                        <View key={index} className="flex-1 flex-row w-full items-start justify-start">
                            <View className="flex flex-col h-full items-center justify-center">
                                <Text
                                    className="text-xl font-medium text-start"
                                    style={{ color: color.TextColor }}>
                                    {item.title}
                                </Text>
                            </View>
                            <View className="flex-1 flex-row h-full items-end justify-start">

                                {item.type === 'obj' && (
                                    item.bioText && item.bioState ?
                                        (
                                            <BioState state={item.bioState} text={item.bioText} />
                                        ) : (
                                            <BioState state={'unknown'} text={'未知'} />
                                        )
                                )}

                                {item.type === 'text' && (
                                    <Text
                                        className="px-3 font-normal text-center"
                                        style={{ color: color.TextColor }}
                                    >
                                        {item.state ?? "無資料"}
                                    </Text>
                                )}

                                {item.type === 'round' && (
                                    <View
                                        className="flex w-full items-center justify-center rounded-3xl"
                                        style={{ backgroundColor: color.SecBtnColor }}
                                    >
                                        <Text
                                            className=""
                                            style={{ color: color.TextColor }}
                                        >
                                            {item.state ?? "無資料"}
                                            {item.title.includes('溫度') && item.state && ` °C`}
                                            {item.title.includes('濕度') && item.state && ` %RH`}
                                        </Text>
                                    </View>
                                )}

                            </View>
                        </View>
                    );
                })}
        </View>
    );
}