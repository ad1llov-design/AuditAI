"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg text-foreground tracking-tight">
                AuditAI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("product")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href={`/${locale}/audit`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("product")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/pricing`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("product")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("company")}</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground">{t("about")}</span></li>
              <li><span className="text-sm text-muted-foreground">{t("blog")}</span></li>
              <li><span className="text-sm text-muted-foreground">{t("careers")}</span></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">{t("legal")}</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-muted-foreground">{t("privacy")}</span></li>
              <li><span className="text-sm text-muted-foreground">{t("terms")}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AuditAI. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
