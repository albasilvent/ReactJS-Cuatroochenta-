"use client";

import { useTranslations } from "next-intl";
import { Divider } from "@mantine/core";
import { WeatherSvg } from "weather-icons-animated";
import { lato_light } from "../../fonts";
import { formatDate } from "../../utils/formatDate";
import { capitalizeFirstWord } from "../../utils/capitalizeFirstWord";
import { getWeatherIconState } from "../../utils/getWeatherIconState";

export default function WeeklyForecast({ weeklyForecast }: any) {
    const t = useTranslations("Page");

    return (
        <section className="bg-white flex flex-col w-1/3 justify-between h-full rounded-lg shadow-gray-500 shadow-lg p-4">
            <p className="text-lg w-full text-start">{t("5-day-forecast")}</p>
            {weeklyForecast &&
                weeklyForecast.map((day: any, index: number) => {
                    return (
                        <div key={index}>
                            <div className="flex justify-around items-center">
                                <p className={`${lato_light.className}`}>
                                    {formatDate(day.dt_txt)}
                                </p>
                                <div className="flex gap-2 items-center justify-center">
                                    <WeatherSvg
                                        state={getWeatherIconState(
                                            day?.weather,
                                            false
                                        )}
                                        width={60}
                                        height={60}
                                    />
                                    <p>
                                        {capitalizeFirstWord(day?.description)}
                                    </p>
                                </div>
                                <p className={`${lato_light.className}`}>
                                    {Math.round(day?.temp_max)}º/
                                    {Math.round(day?.temp_min)}º
                                </p>
                            </div>
                            <Divider />
                        </div>
                    );
                })}
        </section>
    );
}
