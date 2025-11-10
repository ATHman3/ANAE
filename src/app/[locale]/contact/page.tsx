import { Metadata } from "next";
import ContactSection from "@/components/Contact/ContactSection";
import { generateMetadata as generateSEOMetadata, type Locale, generateContactPageJsonLd } from "@/lib/metadata";
import { getTranslations } from "next-intl/server";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  
  return generateSEOMetadata({
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    path: '/contact',
    image: '/images/og/og-logo.png',
    imageAlt: t('imageAlt'),
    type: 'website',
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const contactJsonLd = generateContactPageJsonLd(locale as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        <div className="pt-24 md:pt-28">
          <ContactSection />
        </div>
      </div>
    </>
  );
}
