"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function CulturalEventsSection() {
  const t = useTranslations("home.sections.culturalEvents");

  return (
    <div className="mb-8 md:mb-10">
      <div className="bg-muted/20 py-8 md:py-12 rounded-lg px-6">
        {/* Title and Description */}
        <div className="mb-8 md:mb-12 text-center max-w-3xl mx-auto">
          <h3 className="mb-6 text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            {t("title")}
          </h3>
          <p className="text-lg leading-8 text-muted-foreground md:text-xl">
            {t("description")}
          </p>
        </div>

        {/* Gallery with varied image sizes - Mosaic layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large image - spans 2 columns */}
          <div className="md:col-span-2">
            <div className="relative w-full h-full min-h-[300px] md:min-h-[450px] rounded-lg overflow-hidden bg-muted/30">
              <Image
                src="/images/home/cultural-events/cultural-events-1.png"
                alt={`${t("title")} - Image principale`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>
          </div>

          {/* Small image 1 - top right */}
          <div className="md:col-span-1">
            <div className="relative w-full h-full min-h-[200px] md:min-h-[220px] rounded-lg overflow-hidden bg-muted/30">
              <Image
                src="/images/home/cultural-events/cultural-events-2.png"
                alt={`${t("title")} - Image 2`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

