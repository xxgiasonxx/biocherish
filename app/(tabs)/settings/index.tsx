import { Main } from "@/components/Main";
import { Section } from "@/components/Section";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import { ThemeContext } from "@/components/providers/ThemeProviders";

const Items: ItemsProps[] = [
    { id: '1', title: '個人檔案', icon: 'person', path: `/settings/personal` },
    { id: '2', title: '通知設定', icon: 'notifications', path: `/settings/notifications` },
];

type SettingItemProps = {
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    path: "/settings/personal" | "/settings/notifications";
};

type ItemsProps = SettingItemProps & {
    id: string;
};

const SettingItem = ({ title, icon, path }: SettingItemProps) => {
    const router = useRouter();
    const { color } = useContext(ThemeContext);
    return (
        <Pressable 
            className="flex flex-row items-center justify-between p-4 md:p-5 rounded-2xl md:rounded-3xl bg-BoxBackground dark:bg-DarkBoxBackground shadow-2xl"
            onPress={() => router.push(path)}
        >
            <View className="flex flex-row items-center gap-2 md:gap-3 flex-1">
                <MaterialIcons name={icon} size={24} color={color.TextColor} className="md:w-7 md:h-7" />
                <Text className="text-lg md:text-2xl pb-0.5 md:pb-1 font-bold text-TextColor dark:text-DarkTextColor flex-shrink" numberOfLines={1}>
                    {title}
                </Text>
            </View>

            <View className="flex items-center justify-center ml-2">
                <MaterialIcons name="chevron-right" size={24} color={color.TextColor} className="md:w-7 md:h-7" />
            </View>
        </Pressable>
    )
};

function SettingsPage() {
    return (
        <Main>
            <Section>
                <View className="w-full h-full flex flex-col gap-3 p-1">
                    {
                        Items.map(item => (
                            <SettingItem key={item.id} title={item.title} icon={item.icon} path={item.path} />
                        ))
                    }
                </View>
            </Section>
        </Main>
    );
}

export default SettingsPage;