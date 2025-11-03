import { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '@/components/providers/ThemeProviders'

type boxProps = {
    children: React.ReactNode
    padding?: number
    gap?: number
}

export function Box({ children, padding = 15, gap = 3 }: boxProps) {
    const { color } = useContext(ThemeContext)

    return (
        <View className="flex-1 flex-col min-h-48 w-full items-center rounded-[20px] shadow" style={{
            backgroundColor: color.BoxBackground,
            padding: padding,
            gap: gap
        }}>
            {children}
        </View>
    )
};