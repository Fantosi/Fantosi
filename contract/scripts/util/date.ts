const getDate = (timestamp: number): Date => {
    return new Date(timestamp * 1000);
};

export const unixToTimeString = (unixTime: number): string => {
    const date: Date = getDate(unixTime);
    const beforeFormat = date.toISOString();
    return beforeFormat.substring(0, 10).concat(" / ").concat(beforeFormat.substring(11, 19).concat(" (UTC) 입니다."));
};
