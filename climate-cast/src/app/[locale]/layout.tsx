import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./ui/globals.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { lato } from "./fonts";

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`w-screen h-screen ${lato.className} overflow-hidden`}
            >
                <MantineProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
