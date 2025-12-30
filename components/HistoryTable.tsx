import { Box } from '@/components/Box';
import { BioState, BioStateType } from '@/components/BioState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { cssInterop } from 'nativewind';
import { formatDate } from '@/lib/time';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export type HistoryItem = {
    id: string;
    status: BioStateType;
    status_text: string;
    details: `/home/${string}/history/${string}`;
    scanned_at: number;
};

export type HistoryTableProps = {
    data: HistoryItem[];
    totalPage: number;
    maxItemsPerPage: number;
    currentPage: number;
    setPage: (page: number) => void;
}

export function HistoryTable({ data, totalPage, maxItemsPerPage, currentPage, setPage }: HistoryTableProps) {

    return (
        <>
            <Box>
                <View className='flex w-full flex-row items-center justify-center'>
                    <HistoryTableTitle title="狀態" />
                    <HistoryTableTitle title="日期" />
                    <HistoryTableTitle title="詳情" />
                </View>
                <View
                    className='h-[1px] w-full my-2 bg-TextColor dark:bg-DarkTextColor'
                />
                <View className='flex w-full flex-col gap-5 mb-3'>
                    <HistoryTableContent data={data} />
                </View>
            <HistoryTablePagination totalPage={totalPage} currentPage={currentPage} maxItemsPerPage={maxItemsPerPage} setPage={setPage} />
            </Box>
        </>
    );
}

function HistoryTableTitle({ title }: { title: string }) {
    return (
        <View className='flex-1 items-center justify-center'>
            <Text
                className='text-[20px] font-bold text-TextColor dark:text-DarkTextColor'
            >
                {title}
            </Text>
        </View>
    );
}


function HistoryTableContent({ data }: { data: HistoryItem[] }) {
    const router = useRouter();
    
    return (
        data.map((item, index) => (
            <View key={index} className='flex w-full flex-row items-center justify-center'>
                <View className='flex-1 items-center justify-center'>
                    <BioState state={item.status} text={item.status_text} />
                </View>

                <View className='flex-2 items-center justify-center'>
                    <Text
                        className='text-[14px] font-bold text-TextColor dark:text-DarkTextColor'
                    >
                        {formatDate(item.scanned_at)}
                    </Text>
                </View>

                <Pressable 
                    className='flex-1 items-center justify-center'
                    onPress={() => {
                        router.push(item.details);
                    }}
                >
                    <MaterialCommunityIcons name='arrow-right-circle' size={24} className='text-TextColor dark:text-DarkTextColor' />
                </Pressable>
            </View>
        ))
    )
}

type HistorytablePaginationProps = {
    totalPage: number;
    currentPage: number;
    maxItemsPerPage: number;
    setPage: (page: number) => void;
}

function HistoryTablePagination({ totalPage, currentPage, maxItemsPerPage, setPage }: HistorytablePaginationProps) {

    return (
        <View className='flex w-full flex-row items-center justify-center gap-3 mt-4'>
            {
                    <HistoryTableArrow direction='left' currentPage={currentPage} setPage={setPage} disabled={currentPage === 1} />
            }
            {
                Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
                    <HistoryTablePageItem key={page} page={page} currentPage={currentPage} setPage={setPage} />
                ))
            }
            {
                    <HistoryTableArrow direction='right' currentPage={currentPage} setPage={setPage} disabled={currentPage === totalPage} />
            }
        </View>
    );
}   

type HistoryTablePageItemProps = {
    page: number;
    currentPage: number;
    setPage: (page: number) => void;
}

function HistoryTablePageItem({ page, currentPage, setPage }: HistoryTablePageItemProps) {
    return (
        <Pressable 
            className={`px-3 py-1 ${page !== currentPage ? 'bg-BoxBackground dark:bg-DarkBoxBackground' : 'bg-ActiveColor dark:bg-DarkActiveColor'} rounded-3xl shadow-lg `}
            onPress={() => {
                setPage(page);
            }}
        >
            <Text className='text-TextColor dark:text-DarkTextColor font-bold'>
                {page}
            </Text>
        </Pressable>
    );
}

type HistoryTableArrowProps = {
    direction: 'left' | 'right';
    currentPage: number;
    setPage: (page: number) => void;
    disabled: boolean;
}

function HistoryTableArrow({ direction, currentPage, setPage, disabled }: HistoryTableArrowProps) {
    return (
        <Pressable
            className='px-2 py-1 bg-BoxBackground dark:bg-DarkBoxBackground rounded-3xl shadow-lg disabled:opacity-50'
            disabled={disabled}
            onPress={() => {
                if (direction === 'left') {
                    setPage(Math.max(currentPage - 1, 1));
                } else {
                    setPage(currentPage + 1);
                }
            }}
        >
            <MaterialCommunityIcons name={direction === 'left' ? 'arrow-left' : 'arrow-right'} size={24} className='text-TextColor dark:text-DarkTextColor' />
        </Pressable>
    );
}

cssInterop(MaterialCommunityIcons, {
    className: {
        target: 'style'
    }
});