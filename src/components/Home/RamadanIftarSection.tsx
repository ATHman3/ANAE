"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function RamadanIftarSection() {
  const t = useTranslations("home.sections.ramadanIftar");

  return (
    <div className="mb-8 md:mb-10">
      <div className="bg-white py-8 md:py-12 rounded-lg px-6">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-8 items-center">
          {/* Content - Left side */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
              {t("title")}
            </h3>
            <p className="text-lg leading-8 text-muted-foreground md:text-xl">
              {t("description")}
            </p>
          </div>

          {/* Image Gallery - Right side with mosaic layout */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Large main image - spans 2 columns */}
              <div className="col-span-2">
                <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden bg-muted/30">
                  <Image
                    src="/images/home/ramadan-iftar/ramadan-iftar-1.png"
                    alt={`${t("title")} - Image principale`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </div>
              </div>

              {/* Small image 1 */}
              <div className="col-span-1">
                <div className="relative w-full h-full min-h-[200px] md:min-h-[250px] rounded-lg overflow-hidden bg-muted/30">
                  <Image
                    src="/images/home/ramadan-iftar/ramadan-iftar-2.png"
                    alt={`${t("title")} - Image 2`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />
                </div>
              </div>

              {/* Small image 2 */}
              <div className="col-span-1">
                <div className="relative w-full h-full min-h-[200px] md:min-h-[250px] rounded-lg overflow-hidden bg-muted/30">
                  <Image
                    src="/images/home/ramadan-iftar/ramadan-iftar-3.png"
                    alt={`${t("title")} - Image 3`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

