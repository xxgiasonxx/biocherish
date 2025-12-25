import { Main } from "@/components/Main";
import { Section } from "@/components/Section";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Items: ItemsProps[] = [
    { id: '1', title: '個人檔案', icon: 'person' },
    { id: '2', title: '通知設定', icon: 'notifications' },
];

type SettingItemProps = {
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
};

type ItemsProps = SettingItemProps & {
    id: string;
};

const SettingItem = ({ title, icon }: SettingItemProps) => {

    return (
        <Pressable className="flex flex-row items-center justify-center p-5 rounded-3xl bg-BoxBackground dark:bg-DarkBoxBackground shadow-2xl"
        >
            <View className="flex flex-1 flex-row items-center justify-start gap-3">
                <MaterialIcons name={icon} size={28} color="#131111ff" />
                <Text className="text-2xl pb-1 font-bold">{title}</Text>
            </View>

            <View className="flex flex-1 flex-row items-center justify-end">
                <MaterialIcons name="chevron-right" size={28} color="#131111ff" />
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
                            <SettingItem key={item.id} title={item.title} icon={item.icon} />
                        ))
                    }
                </View>
            </Section>
        </Main>
    );
}

export default SettingsPage;