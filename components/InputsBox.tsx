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
    const updateInput = (index: number, text: string) => {
        // 💡 修正 2：複製傳入的 props 並修改
        const newInputs = [...needed];
        const currentItem = newInputs[index];
        const newValue = currentItem.type === 'number' ? (Number(text) || 0) : text;
        
        newInputs[index] = { ...currentItem, values: newValue };
        
        // 💡 修正 3：直接呼叫父層傳來的回呼函數
        onChange?.(newInputs);
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
                {needed.map((item, index) => (
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
                                    className="flex w-full items-center justify-center rounded-3xl text-center text-TextColor dark:text-DarkTextColor bg-SecBtnColor dark:bg-DarkSecBtnColor"

                                    inputMode={item.type === 'number' ? 'numeric' : 'text'}
                                    secureTextEntry={item.type === 'password'}
                                    placeholder={item.type === 'password' ? '********' : `請輸入${item.title.replace(':', '')}`}
                                    value={String(needed[index].values)}
                                    onChangeText={(text) => updateInput(index, text)}
                                />
                            ) : (
                                <Text
                                    className="flex w-full items-center justify-center rounded-3xl text-center text-TextColor dark:text-DarkTextColor px-4 py-2"
                                >
                                    {String(needed[index].values)}
                                </Text>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </Box>
    );
}
