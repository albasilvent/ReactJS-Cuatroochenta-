"use client";

import { BackgroundImage } from "@mantine/core";
import { lato_light } from "../../fonts";
import { WeatherSvg } from "weather-icons-animated";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";
import axios from "axios";
import { useState, useEffect } from "react";
import WeatherCardProps from "../../interfaces/WeatherCardProps";
import { capitalizeFirstWord } from "../../utils/capitalizeFirstWord";
import { getWeeklyData } from "../../utils/getWeeklyData";
import { getWeatherIconState } from "../../utils/getWeatherIconState";

export default function WeatherCard({
    activeCity,
    selectedLanguage,
}: WeatherCardProps) {
    const [currentForecast, setCurrentForecast] = useState<any>(null);
    const [todayForecast, setTodayForecast] = useState<any>([]);
    const [weeklyForecast, setWeeklyForecast] = useState<any>(null);
    const [isNight, setIsNight] = useState(false);
    const [city, setCity] = useState<string>();

    const fetchData = async (lat: number, lon: number) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

            const [responseCurrent, responseWeekly] = await Promise.all([
                axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${selectedLanguage}`
                ),
                axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${selectedLanguage}`
                ),
            ]);

            const now = new Date();
            const currentHour = now.getHours();
            const isNight = currentHour >= 20 || currentHour < 6;

            const todayFilteredData = responseWeekly.data.list.slice(0, 10);

            const weeklyFilteredData = getWeeklyData(responseWeekly.data.list);

            setCurrentForecast(responseCurrent.data);
            setTodayForecast(todayFilteredData);
            setWeeklyForecast(weeklyFilteredData);
            setIsNight(isNight);
            setCity(activeCity?.city);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        if (activeCity) {
            fetchData(activeCity.lat, activeCity.lon);
        }
    }, [activeCity, selectedLanguage]);

    return (
        <BackgroundImage
            src="/clear.jpg"
            style={{
                width: "75vw",
                position: "relative",
                zIndex: "10",
                borderRadius: "20px",
            }}
        >
            <main className="w-full h-full flex rounded-3xl p-5 gap-7 shadow-gray-500 shadow-lg">
                <article className="w-2/3 ">
                    {currentForecast && (
                        <div className="flex h-1/3 w-full p-4 pb-6 items-center justify-between text-white">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h1
                                        style={{
                                            textShadow: "2px 2px grey",
                                        }}
                                        className={`text-5xl tracking-wider`}
                                    >
                                        {city}
                                    </h1>
                                    <p
                                        className={`text-2xl ${lato_light.className}`}
                                    >
                                        {capitalizeFirstWord(
                                            currentForecast.weather[0]
                                                ?.description
                                        )}
                                    </p>
                                </div>
                                <p className="text-6xl">
                                    {currentForecast.main?.temp}º
                                </p>
                            </div>

                            <WeatherSvg
                                state={getWeatherIconState(
                                    currentForecast.weather[0]?.main,
                                    isNight
                                )}
                                width={180}
                                height={180}
                            />
                        </div>
                    )}
                    {todayForecast && (
                        <TodayForecast
                            todayForecast={todayForecast}
                            currentForecast={currentForecast}
                        />
                    )}
                </article>
                {weeklyForecast && (
                    <WeeklyForecast weeklyForecast={weeklyForecast} />
                )}
            </main>
        </BackgroundImage>
    );
}
