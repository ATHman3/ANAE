"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const categories = [
    'about',
    'donations',
    'volunteering',
    'beneficiaries',
    'contact',
  ] as const;

  const toggleItem = (categoryKey: string, questionIndex: number) => {
    const key = `${categoryKey}-${questionIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-16">
      {categories.map((categoryKey) => {
        const categoryTitle = t(`categories.${categoryKey}.title`);
        const questions = t.raw(`categories.${categoryKey}.questions`) as Array<{
          question: string;
          answer: string;
        }>;

        if (!questions || questions.length === 0) return null;

        return (
          <section key={categoryKey} className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground">
              {categoryTitle}
            </h2>
            <div className="space-y-1">
              {questions.map((item, index) => {
                const key = `${categoryKey}-${index}`;
                const isOpen = openItems[key] || false;

                return (
                  <div
                    key={key}
                    className="rounded-lg overflow-hidden bg-card border border-border/50 hover:border-border transition-colors"
                  >
                    <button
                      onClick={() => toggleItem(categoryKey, index)}
                      className={cn(
                        "w-full px-6 py-5 text-left rtl:text-right flex items-center justify-between gap-4 rtl:flex-row-reverse transition-all duration-200 hover:bg-muted/30 cursor-pointer",
                        isOpen && "bg-muted/20"
                      )}
                      aria-expanded={isOpen}
                    >
                      <span className={cn(
                        "font-semibold flex-1",
                        isOpen ? "text-primary" : "text-foreground"
                      )}>
                        {item.question}
                      </span>
                      <span className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-primary" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 py-5 bg-background">
                        <p className="text-foreground/80 leading-relaxed whitespace-pre-line pl-4 rtl:pl-0 rtl:pr-4">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

