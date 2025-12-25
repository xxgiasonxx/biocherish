/**
* 基础日期格式化函数
* @param date 日期对象或字符串
* @param format 格式模板，支持 YYYY/MM/DD/HH/mm/ss
* @returns 格式化后的字符串
*/

export const formatDate = (
    date: number,
    format = 'YYYY-MM-DD HH:mm:ss'
): string => {
    const targetDate = new Date(date);

    // 处理无效日期
    if (isNaN(targetDate.getTime())) return 'Invalid Date';

    const padZero = (num: number, length = 2) =>
        String(num).padStart(length, '0');

    const replacements: Record<string, string> = {
        YYYY: padZero(targetDate.getFullYear()),
        MM: padZero(targetDate.getMonth() + 1),
        DD: padZero(targetDate.getDate()),
        HH: padZero(targetDate.getHours()),
        mm: padZero(targetDate.getMinutes()),
        ss: padZero(targetDate.getSeconds())
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match]);
};