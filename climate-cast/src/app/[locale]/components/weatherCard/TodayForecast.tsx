"use client";

import { Divider, ScrollArea } from "@mantine/core";
import { WeatherSvg } from "weather-icons-animated";
import { TbTemperature, TbWind } from "react-icons/tb";
import { lato_light } from "../../fonts";
import { useTranslations } from "next-intl";
import TodayForecastProps from "../../interfaces/TodayForecastProps";
import { getWeatherIconState } from "../../utils/getWeatherIconState";
import { isNightTime } from "../../utils/isNightTime";
import { formatDate } from "../../utils/formatDate";

export default function TodayForecast({
    todayForecast,
    currentForecast,
}: TodayForecastProps) {
    const t = useTranslations("Page");

    return (
        todayForecast &&
        currentForecast && (
            <article className="bg-white h-2/3 w-full rounded-lg p-4 flex flex-col items-center justify-between gap-3 shadow-gray-500 shadow-lg">
                <h1 className="text-lg w-full text-start">
                    {t("today-forecast")}
                </h1>
                {todayForecast && (
                    <ScrollArea h={200} w={600}>
                        <section className="h-2/3 w-full flex gap-5 justify-around items-center">
                            {todayForecast &&
                                todayForecast.map(
                                    (interval: any, index: number) => {
                                        const dateString =
                                            interval.dt_txt.split(" ")[0];
                                        const timeString = interval.dt_txt
                                            .split(" ")[1]
                                            .substring(0, 5);
                                        const formattedDate =
                                            formatDate(dateString);
                                        const isNight = isNightTime(timeString);

                                        return (
                                            <div key={index}>
                                                <div
                                                    className={`flex flex-col justify-between items-center p-4 rounded-lg shadow-gray-500 shadow-lg ${
                                                        isNight
                                                            ? "bg-slate-400"
                                                            : "bg-gray-100"
                                                    }`}
                                                >
                                                    <div className="flex gap-2">
                                                        <p
                                                            className={`${lato_light.className}`}
                                                        >{`${formattedDate}`}</p>
                                                        <p>{`${timeString}`}</p>
                                                    </div>
                                                    <WeatherSvg
                                                        state={getWeatherIconState(
                                                            currentForecast
                                                                .weather[0]
                                                                ?.main,
                                                            isNight
                                                        )}
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <p>{interval.main.temp}º</p>
                                                </div>
                                                {index <
                                                    todayForecast.length -
                                                        1 && (
                                                    <Divider
                                                        size="xs"
                                                        orientation="vertical"
                                                        key={index}
                                                    />
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                        </section>
                    </ScrollArea>
                )}

                <h1 className="text-lg w-full text-start">
                    {t("additional-info")}
                </h1>
                {currentForecast && (
                    <section className="h-1/3 w-full flex flex-wrap">
                        <div className="w-1/2 flex items-center justify-center gap-2">
                            <TbTemperature className="w-7 h-7" />
                            <p className={`${lato_light.className} text-icon`}>
                                {t("thermal-sensation")}
                            </p>
                            <p className="text-icon2">
                                {currentForecast?.main?.feels_like}º
                            </p>
                        </div>
                        <div className="w-1/2 flex items-center justify-center gap-2">
                            <TbWind className="w-6 h-6" />
                            <p className={`${lato_light.className} text-icon`}>
                                {t("wind")}
                            </p>
                            <p className="text-icon2">
                                {(currentForecast.wind.speed * 3.6).toFixed(2)}{" "}
                                km/h
                            </p>
                        </div>
                        <div className="w-1/2 flex items-center justify-center gap-2">
                            <TbTemperature className="w-7 h-7" />
                            <p className={`${lato_light.className} text-icon`}>
                                Max
                            </p>
                            <p className="text-icon2">
                                {currentForecast?.main?.temp_max}º
                            </p>
                        </div>

                        <div className="w-1/2 flex items-center justify-center gap-2">
                            <TbTemperature className="w-7 h-7" />
                            <p className={`${lato_light.className} text-icon`}>
                                Min
                            </p>
                            <p className="text-icon2">
                                {currentForecast?.main?.temp_min}º
                            </p>
                        </div>
                    </section>
                )}
            </article>
        )
    );
}
