"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundSection() {
    const t = useTranslations("notFound");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-24 pb-16">
            <div className="text-center max-w-2xl mx-auto px-4">
                {/* 404 Number */}
                <h1 className="text-9xl font-bold text-black dark:text-white mb-6">
                    404
                </h1>

                {/* Title and Subtitle */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {t("title")}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {t("subtitle")}
                </p>
                <p className="text-base text-gray-500 dark:text-gray-400 mb-10">
                    {t("description")}
                </p>

                {/* Single Action Button */}
                <div>
                    <Button asChild size="lg" variant="outline" className="shadow-md hover:shadow-lg transition-all">
                        <Link href="/">
                            <Home className="h-5 w-5 mr-2" />
                            {t("actions.home")}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
