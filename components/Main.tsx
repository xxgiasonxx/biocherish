import React, { useCallback, useState } from "react";
import { View, ScrollView, Platform, RefreshControl } from "react-native";
import "../global.css"


type MainProps = {
    children: React.ReactNode;
    onRefresh?: (() => Promise<void>) | Array<() => Promise<void>>;
}

export function Main({ children, onRefresh }: MainProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        if (!onRefresh) return;

        setIsRefreshing(true);

        try {
            if (Array.isArray(onRefresh)) {
                // 使用 allSettled 確保所有 API 都執行完，即便其中一個噴錯
                await Promise.allSettled(onRefresh.map(fn => typeof fn === 'function' ? fn() : null));
            } else if (typeof onRefresh === 'function') {
                await onRefresh();
            }
        } catch (error) {
            console.error("Refresh Error:", error);
        } finally {
            // 延遲一點點關閉，視覺體驗較流暢
            setTimeout(() => setIsRefreshing(false), 500);
        }
    }, [onRefresh]);

    if (Platform.OS === 'web') {
        return (
            <View style={{ flex: 1 }} className="flex flex-col items-center justify-center py-[1%] gap-[1%] bg-Background dark:bg-DarkBackground" >
                {children}
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: 100,
            }}
            style={{ flex: 1 }}
            className="bg-Background dark:bg-DarkBackground"
            // 加入 RefreshControl
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    title="更新中..."           // iOS 提示文字
                />
            }
        >
            {children}
        </ScrollView>
    );
}