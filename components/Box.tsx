import { View } from 'react-native'

type boxProps = {
    children: React.ReactNode
    padding?: number
    gap?: number
}

export function Box({ children, padding = 15, gap = 3 }: boxProps) {

    return (
        <View className="flex-1 flex-col min-h-48 w-full items-center rounded-[20px] shadow bg-BoxBackground dark:bg-DarkBoxBackground" style={{
            padding: padding,
            gap: gap
        }}>
            {children}
        </View>
    )
};