"use client";

import { ArrowRight } from "lucide-react";
import { Link as LocaleLink } from "@/i18n/navigation";
import type { HeroStat } from "./types";

type HeroSummaryProps = {
    headline: string;
    subheadline: string;
    cta: { href: string; label: string };
    stats: HeroStat[];
};

export default function HeroSummary({ headline, subheadline, cta, stats }: HeroSummaryProps) {
    return (
        <section className="bg-emerald-50/60 py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
                <div className="space-y-6">
                    <h2 className="text-3xl font-semibold text-emerald-900">{headline}</h2>
                    <p className="text-base leading-relaxed text-emerald-700">{subheadline}</p>
                    <LocaleLink
                        href={cta.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-600"
                    >
                        {cta.label}
                        <ArrowRight className="h-4 w-4" />
                    </LocaleLink>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {stats.map(({ key, value, label }) => (
                        <div key={key} className="flex flex-col items-center justify-center rounded-lg border border-emerald-200/50 bg-white/40 p-6 text-center">
                            <p className="text-3xl font-medium text-emerald-700">{value}</p>
                            <p className="text-base font-medium text-emerald-700 mt-1">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
