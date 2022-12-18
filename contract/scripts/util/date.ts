// KST - UTC 시차
const TIME_ZONE = 3240 * 10000;

const getDate = (timestamp: number): Date => {
    return new Date(timestamp * 1000);
};

export const unixToTimeString = (unixTime: number): string => {
    const date: Date = getDate(unixTime);
    const kstDate = new Date(+date + TIME_ZONE);
    const beforeFormat = kstDate.toISOString();
    return beforeFormat.substring(0, 10).concat(" / ").concat(beforeFormat.substring(11, 19).concat(" (KST) 입니다."));
};
