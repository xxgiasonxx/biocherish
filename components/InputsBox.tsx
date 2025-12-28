import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Box } from "@/components/Box";

export type InputsType = {
    title: string;
    type: 'string' | 'number' | 'password';
    values: string | number;
    setting: boolean;
}

type InputsBoxProps = {
    BigTitle: string;
    needed: InputsType[];
    onChange?: (values: InputsType[]) => void;
}

export function InputsBox({ BigTitle, needed, onChange }: InputsBoxProps) {
    // 初始化 state
    const [inputs, setInputs] = useState<InputsType[]>(needed);

    // 關鍵修正：監聽外部傳入的 needed，並同步到內部 state
    useEffect(() => {
        setInputs(needed);
    }, [needed]);

    // // 當輸入改變時回傳給父層
    useEffect(() => {
        onChange?.(inputs);
    }, [inputs, onChange]);

    const updateInput = (index: number, text: string) => {
        const newInputs = [...inputs];
        // 修正：應該根據 item.type 來判斷轉換類型，而不是根據當前的 values 類型
        const currentItem = newInputs[index];
        const newValue = currentItem.type === 'number' ? (Number(text) || 0) : text;
        
        newInputs[index] = { ...currentItem, values: newValue };
        setInputs(newInputs);
    };

    return (
        <Box padding={20} gap={10}>
            <View className="flex w-full flex-col items-start">
                <Text
                    className="text-2xl font-bold text-start text-TextColor dark:text-DarkTextColor"
                >
                    {BigTitle}
                </Text>
            </View>

            <View className="flex w-full flex-col items-start p-[2%] gap-3">
                {inputs.map((item, index) => (
                    <View
                        key={index}
                        className="flex-1 flex-row w-full items-start justify-start gap-4"
                    >
                        <View className="flex flex-col h-full items-center justify-center">
                            <Text
                                className="text-xl font-medium text-start text-TextColor dark:text-DarkTextColor"
                            >
                                {item.title}
                            </Text>
                        </View>

                        <View className="flex-1 flex-row h-full items-center justify-start">
                            {item.setting ? (
                                <TextInput
                                    keyboardType="default"
                                    className="flex w-full items-center justify-center rounded-3xl text-center text-TextColor dark:text-DarkTextColor bg-SecBtnColor dark:bg-DarkSecBtnColor"

                                    inputMode={item.type === 'number' ? 'numeric' : 'text'}
                                    secureTextEntry={item.type === 'password'}
                                    placeholder={item.type === 'password' ? '********' : `請輸入${item.title.replace(':', '')}`}
                                    value={String(inputs[index].values)}
                                    onChangeText={(text) => updateInput(index, text)}
                                />
                            ) : (
                                <Text
                                    className="flex w-full items-center justify-center rounded-3xl text-center text-TextColor dark:text-DarkTextColor px-4 py-2"
                                >
                                    {String(inputs[index].values)}
                                </Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </Box>
    );
}
