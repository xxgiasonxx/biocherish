import React, { createContext, useContext, useState, useCallback } from 'react';

const RefreshContext = createContext({
  refreshing: false,
  triggerRefresh: async () => {},
  registerFetch: (fn: () => Promise<any>) => () => {}, // 回傳清理函式
});

export const RefreshProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshing, setRefreshing] = useState(false);
  // 使用陣列儲存當前頁面需要刷新的所有 API
  const [fetchFunctions, setFetchFunctions] = useState<(() => Promise<any>)[]>([]);

  const registerFetch = useCallback((fn: () => Promise<any>) => {
    setFetchFunctions(prev => [...prev, fn]);
    // 清理函式：當組件卸載時，從陣列中移除該 API
    return () => {
      setFetchFunctions(prev => prev.filter(f => f !== fn));
    };
  }, []);

  const triggerRefresh = async () => {
    if (fetchFunctions.length === 0) return;
    setRefreshing(true);
    try {
      // 只執行「當前 Provider 內」註冊的 API
      await Promise.all(fetchFunctions.map(fn => fn()));
    } catch (error) {
      console.error("Refresh Error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <RefreshContext.Provider value={{ refreshing, triggerRefresh, registerFetch }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => useContext(RefreshContext);