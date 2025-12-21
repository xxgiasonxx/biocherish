import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { cssInterop } from "nativewind";

type TitleBarProps = {
    title: string;
}

export function TitleBar({ title }: TitleBarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  return (
    <View className="flex-1 w-full flex-row items-center gap-[10px]">
      <View className="flex justify-center">
        {isEditing ? (
          <TextInput
            value={currentTitle}
            onChangeText={setCurrentTitle}
            onBlur={() => setIsEditing(false)} // 失焦結束編輯
            autoFocus
            className="text-[24px] font-bold border-b-2 border-TextColor dark:border-DarkTextColor mb-2 text-TextColor dark:bg-DarkTextColor"
          />
        ) : (
          <Text
            className="text-[24px] font-bold text-TextColor dark:text-DarkTextColor"
            onPress={() => setIsEditing(true)} // 點文字也能進入編輯模式
          >
            {currentTitle}
          </Text>
        )}
      </View>

      <Pressable onPress={() => setIsEditing((prev) => !prev)}>
        <FontAwesome6
          name="edit"
          size={20}
          className="text-TextIconColor dark:text-DarkTextIconColor"
        />
      </Pressable>
    </View>
  );
}

cssInterop(FontAwesome6, {
  className: {
    target: 'style',
  },
});