import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NotFoundSection from "@/components/NotFound/NotFoundSection";

export default async function NotFound() {
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <Header is404={true} />
            <NotFoundSection />
            <Footer />
        </NextIntlClientProvider>
    );
}
