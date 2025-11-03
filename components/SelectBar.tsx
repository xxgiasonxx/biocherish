
import { View, Text, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { ThemeContext } from '@/components/providers/ThemeProviders';

type SelectBarProps = {
    barItems: string[];
    onSelect: (index: number) => void;
}




export function SelectBar({ barItems, onSelect }: SelectBarProps) {
    const { color } = useContext(ThemeContext)
    const [selected, setSelected] = useState<number>(0);

    return (
        <View className='flex flex-row w-full items-center justify-center gap-4 mb-2'>
            {barItems.map((item, index) => {
                const isSelected = selected === index;

                return (
                    <Pressable
                        key={index}
                        onPress={() => { 
                            setSelected(index); 
                            onSelect(index); 
                        }}
                        className='flex py-3 px-4 rounded-3xl'
                        style={{
                            backgroundColor: isSelected ? color.ActiveColor : color.SecBtnColor,
                        }}>
                        <Text
                            className='font-bold text-[20px]'
                            style={{
                                color: color.TextColor
                            }}
                        >
                            {item}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}