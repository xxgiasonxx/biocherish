import { Main } from "@/components/Main";
import { Section } from "@/components/Section";
import { Box } from "@/components/Box";
import { Text, TextInput, View } from 'react-native'
import { useContext } from "react";
import { ThemeContext } from "@/components/providers/ThemeProviders";


function NewEdgePage() {
    const { color } = useContext(ThemeContext);

    return (
        <Main bgColor={color.Background}>
            <Section>
                <Box padding={20} gap={10} >
                    <View className="flex w-full flex-col items-start">
                        <Text
                            className="text-2xl font-bold text-start"
                            style={{ color: color.TextColor }}
                        >
                            裝置
                        </Text>
                    </View>

                    <View className="flex w-full flex-col items-start p-[2%] gap-3">
                        <View className="flex-1 flex-row w-full items-start justify-start">
                            
                            <View className="flex flex-col h-full items-center justify-center">
                                <Text
                                    className="text-xl font-medium text-start"
                                    style={{ color: color.TextColor }}>
                                    裝置ID：
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
                                        style={{ color: color.TextColor }}
                                    >
                                        BC-EDGE-0001
                                    </TextInput>
                                </View>
                            </View>

                        </View>
                    </View>
                </Box>
            </Section>
        </Main>
    )
}

export default NewEdgePage;
