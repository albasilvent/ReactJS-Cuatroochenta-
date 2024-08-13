"use client";

import { useState, useEffect } from "react";
import { BackgroundImage } from "@mantine/core";
import { usePathname } from "next/navigation";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/Sidebar";
import WeatherCard from "./components/weatherCard/WeatherCard";
import CityData from "./interfaces/CityData";

export default function HomePage() {
    const initialCity: CityData = {
        city: "Madrid",
        lat: 40.4165,
        lon: -3.70256,
    };

    const storedCity = sessionStorage.getItem("activeCity");
    const [activeCity, setActiveCity] = useState(
        storedCity ? JSON.parse(storedCity) : initialCity
    );

    const pathname = usePathname();

    const initialLanguage = pathname.startsWith("/es") ? "es" : "en";
    const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

    const data: CityData[] = [
        {
            city: "Madrid",
            lat: 40.416775,
            lon: -3.70379,
        },
        {
            city: "Chicago",
            lat: 41.8781,
            lon: -87.6298,
        },
        {
            city: "Paris",
            lat: 48.85341,
            lon: 2.3488,
        },
    ];

    useEffect(() => {
        if (pathname.startsWith("/es")) {
            setSelectedLanguage("es");
        } else {
            setSelectedLanguage("en");
        }
    }, [pathname]);

    return (
        <>
            <BackgroundImage src="/clear.jpg" className={"w-screen h-screen"}>
                <div className="relative w-screen h-screen flex flex-wrap bg-sky-50 items-center justify-around p-4">
                    <Header
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    />
                    <main className="w-full h-page flex flex-wrap justify-between gap-2 p-4 rounded-lg">
                        <SideBar
                            activeCity={activeCity}
                            setActiveCity={setActiveCity}
                            data={data}
                        />
                        <WeatherCard
                            activeCity={activeCity}
                            selectedLanguage={selectedLanguage}
                        />
                    </main>
                </div>
            </BackgroundImage>
        </>
    );
}
