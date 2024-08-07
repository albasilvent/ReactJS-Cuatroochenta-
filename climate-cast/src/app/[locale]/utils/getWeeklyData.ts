import { capitalizeFirstWord } from "./capitalizeFirstWord";

export function getWeeklyData(list: any[]) {
    // Group data by date
    const groupedByDate = list.reduce((acc: any, item: any) => {
        const date = item.dt_txt.split(" ")[0];

        if (!acc[date]) {
            acc[date] = [];
        }

        acc[date].push(item);

        return acc;
    }, {});

    // Get max and min, and weather condition
    return Object.keys(groupedByDate)
        .map((date) => {
            const items = groupedByDate[date];

            // Find the item for 18:00
            const itemAt18 = items.find((item: any) =>
                item.dt_txt.includes("18:00")
            );
            const descriptionAt18 = itemAt18?.weather[0]?.description || "";
            const weatherAt18 = itemAt18?.weather[0]?.main || "";

            if (!itemAt18) {
                return null;
            }

            // Determine max and min temperatures
            const maxTempRecord = items.reduce((max: any, item: any) => {
                return item.main.temp_max > max.main.temp_max ? item : max;
            }, items[0]);

            const minTempRecord = items.reduce((min: any, item: any) => {
                return item.main.temp_min < min.main.temp_min ? item : min;
            }, items[0]);

            return {
                dt_txt: itemAt18.dt_txt,
                temp_max: maxTempRecord.main?.temp_max,
                temp_min: minTempRecord.main?.temp_min,
                description: capitalizeFirstWord(descriptionAt18),
                weather: weatherAt18,
            };
        })
        .filter((item: any) => item !== null);
}
