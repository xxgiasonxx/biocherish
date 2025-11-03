import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Box } from "@/components/Box";
import { ThemeContext } from '@/components/providers/ThemeProviders';

export type InputsType = {
    title: string;
    type: 'string' | 'number';
    values: string | number;
}

type InputsBoxProps = {
    BigTitle: string;
    needed: InputsType[];
    onChange?: (values: InputsType[]) => void;
}

export function InputsBox({ BigTitle, needed, onChange }: InputsBoxProps) {
    const { color } = useContext(ThemeContext)
    // 初始化 state
    const [inputs, setInputs] = useState<InputsType[]>(needed);

    // 當輸入改變時回傳給父層
    useEffect(() => {
        onChange?.(inputs);
    }, [inputs, onChange]);

    const updateInput = (index: number, text: string) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], values: typeof newInputs[index].values === 'number' ? Number(text) : text };
        setInputs(newInputs);
    };

    return (
        <Box padding={20} gap={10}>
            <View className="flex w-full flex-col items-start">
                <Text
                    className="text-2xl font-bold text-start"
                    style={{ color: color.TextColor }}
                >
                    {BigTitle}
                </Text>
            </View>

            <View className="flex w-full flex-col items-start p-[2%] gap-3">
                {needed.map((item, index) => (
                    <View
                        key={index}
                        className="flex-1 flex-row w-full items-start justify-start gap-4"
                    >
                        <View className="flex flex-col h-full items-center justify-center">
                            <Text
                                className="text-xl font-medium text-start"
                                style={{ color: color.TextColor }}
                            >
                               {item.title} 
                            </Text>
                        </View>

                        <View className="flex-1 flex-row h-full items-center justify-start">
                            <View
                                className="flex w-full items-center justify-center rounded-3xl"
                                style={{ backgroundColor: color.SecBtnColor }}
                            >
                                <TextInput
                                    keyboardType="default"
                                    className=""
                                    inputMode='decimal'
                                    value={String(inputs[index].values)}
                                    onChangeText={(text) => updateInput(index, text)}
                                    style={{ color: color.TextColor }}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </Box>
    );
}
