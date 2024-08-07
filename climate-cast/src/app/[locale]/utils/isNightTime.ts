export const isNightTime = (timeString: string) => {
    const [hour] = timeString.split(":").map(Number);
    return hour >= 20 || hour < 6;
};
