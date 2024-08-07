"use client";

import { SegmentedControl } from "@mantine/core";
import ReactCountryFlag from "react-country-flag";
import { useRouter } from "next/navigation";
import HeaderProps from "../../interfaces/HeaderProps";

export default function Header({
    selectedLanguage,
    setSelectedLanguage,
}: HeaderProps) {
    const router = useRouter();

    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value);
        if (value === "en") {
            router.push("/en");
        } else if (value === "es") {
            router.push("/es");
        }
    };

    return (
        <header className="relative z-10 w-full h-header p-4 flex justify-center items-center">
            <section className="hidden">
                <SegmentedControl
                    key={`left-${selectedLanguage}`}
                    size="sm"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    styles={{
                        root: {
                            backgroundColor: "transparent",
                        },
                    }}
                    data={[
                        {
                            value: "en",
                            label: (
                                <ReactCountryFlag
                                    className="text-lg mx-1"
                                    countryCode="US"
                                    svg
                                />
                            ),
                        },
                        {
                            value: "es",
                            label: (
                                <ReactCountryFlag
                                    className="text-lg mx-1"
                                    countryCode="ES"
                                    svg
                                />
                            ),
                        },
                    ]}
                />
            </section>

            <section className="flex flex-col items-center z-10">
                <div className="flex gap-1 items-end">
                    <h1 className={`text-4xl  text-slate-600`}>Climate</h1>
                    <div className="flex items-end">
                        <h1 className={`text-4xl text-sky-600`}>CAST</h1>
                    </div>
                </div>
            </section>

            <section className="absolute right-0 flex items-center mr-4">
                <SegmentedControl
                    key={`right-${selectedLanguage}`}
                    size="sm"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    styles={{
                        root: {
                            backgroundColor: "#e2e8f0",
                        },
                    }}
                    data={[
                        {
                            value: "en",
                            label: (
                                <ReactCountryFlag
                                    className="text-lg mx-1"
                                    countryCode="US"
                                    svg
                                />
                            ),
                        },
                        {
                            value: "es",
                            label: (
                                <ReactCountryFlag
                                    className="text-lg mx-1"
                                    countryCode="ES"
                                    svg
                                />
                            ),
                        },
                    ]}
                />
            </section>
        </header>
    );
}
