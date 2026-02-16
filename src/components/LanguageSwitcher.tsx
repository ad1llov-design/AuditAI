"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

const locales = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "kg", label: "KG" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          className="relative px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-200"
        >
          {locale === l.code && (
            <motion.div
              layoutId="activeLocale"
              className="absolute inset-0 bg-card rounded-md shadow-sm"
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            />
          )}
          <span
            className={`relative z-10 ${
              locale === l.code
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </span>
        </button>
      ))}
    </div>
  );
}
