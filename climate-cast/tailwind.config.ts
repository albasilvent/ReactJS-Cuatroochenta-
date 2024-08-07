import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontSize: {
                title: "30vh",
                title2: [
                    "22vh",
                    {
                        lineHeight: "270px",
                    },
                ],
                loading: "14vh",
                city: [
                    "35px",
                    {
                        lineHeight: "0px",
                    },
                ],
                temperature: [
                    "42px",
                    {
                        lineHeight: "0px",
                    },
                ],
                icon: [
                    "16px",
                    {
                        lineHeight: "20px",
                    },
                ],
                icon2: [
                    "20px",
                    {
                        lineHeight: "20px",
                    },
                ],
            },
            height: {
                loading: "90%",
                header: "9%",
                page: "89%",
            },
            width: {
                loading: "95%",
                page: "30vw",
                div: "30vw",
            },
        },
    },
};
export default config;
