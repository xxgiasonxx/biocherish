
import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';

type SelectBarProps = {
    barItems: string[];
    onSelect: (index: number) => void;
}




export function SelectBar({ barItems, onSelect }: SelectBarProps) {
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
                        className={`flex py-3 px-4 rounded-3xl ` + (isSelected ? 'bg-ActiveColor' : 'bg-SecBtnColor dark:bg-DarkSecBtnColor')}
                        >
                        <Text
                            className='font-bold text-[20px] text-TextColor dark:text-DarkTextColor'
                        >
                            {item}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}