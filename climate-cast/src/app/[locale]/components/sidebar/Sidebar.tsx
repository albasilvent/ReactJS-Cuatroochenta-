"use client";

import { BackgroundImage } from "@mantine/core";

import ContactModal from "./ContactModal";
import CityData from "../../interfaces/CityData";
import SideBarProps from "../../interfaces/SideBarProps";

export default function SideBar({
    activeCity,
    setActiveCity,
    data,
}: SideBarProps) {
    const handleCityClick = (city: CityData) => {
        sessionStorage.setItem("activeCity", JSON.stringify(city));
        setActiveCity(city);
    };

    return (
        <section className="relative w-1/5 h-full flex flex-col items-center justify-between rounded-lg pt-4">
            {data.map((location) => {
                const isActive =
                    location.city.toLowerCase() ===
                    activeCity?.city.toLowerCase();
                return (
                    <div
                        key={location.city}
                        className={`relative h-1/6 transition-all duration-300 cursor-pointer w-full`}
                        onClick={() => handleCityClick(location)}
                    >
                        <div className="relative h-full w-full rounded-xl shadow-gray-500">
                            <BackgroundImage
                                src="/clear.jpg"
                                radius={15}
                                className={`shadow-gray-500 shadow-lg absolute inset-0 z-0 transition-transform duration-300 hover:grayscale-0`}
                                style={{
                                    filter: isActive
                                        ? "none"
                                        : "grayscale(90%)",
                                }}
                            >
                                <div className="relative z-10 h-full w-full p-5 flex gap-5 justify-center rounded-3xl items-center text-white">
                                    <p
                                        style={{
                                            textShadow: "2px 2px grey",
                                        }}
                                        className={`text-city tracking-wider`}
                                    >
                                        {location.city}
                                    </p>
                                </div>
                            </BackgroundImage>
                        </div>
                    </div>
                );
            })}
            <ContactModal />
        </section>
    );
}
