import { useContext, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { ThemeContext } from "@/components/providers/ThemeProviders";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

type TitleBarProps = {
    title: string;
}

export function TitleBar({ title }: TitleBarProps) {
  const { color } = useContext(ThemeContext);
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
            style={{
              color: color.TextColor,
              fontSize: 24,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderBottomColor: color.TextColor,
              marginBottom: 6,
            }}
          />
        ) : (
          <Text
            className="text-[24px] font-bold"
            style={{ color: color.TextColor }}
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
          color={color.TextIconColor}
        />
      </Pressable>
    </View>
  );
}