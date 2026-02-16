"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";

const featureIcons = [
  <svg key="smart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  <svg key="revenue" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="growth" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  <svg key="risk" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
];

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  const features = t.raw("features.items") as Array<{
    title: string;
    description: string;
  }>;

  const stats = t.raw("social.stats") as Array<{
    value: string;
    label: string;
  }>;

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 lg:py-36">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <Badge variant="accent" className="mb-6">
              ✦ {t("hero.badge")}
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
              {t("hero.title")}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/${locale}/audit`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground
                           font-medium text-base shadow-lg shadow-primary/25 hover:shadow-xl
                           hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
              >
                {t("hero.cta")}
              </Link>
              <Link
                href={`/${locale}/pricing`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-border
                           text-foreground font-medium text-base hover:bg-secondary transition-all"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </FadeIn>

          {/* Visual element */}
          <FadeIn delay={0.5}>
            <div className="mt-16 sm:mt-20 relative max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/5">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-danger/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <span className="ml-3 text-xs text-muted-foreground font-mono">
                    audit-dashboard.ai
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { label: "Leads", value: "2,847", change: "+23%" },
                    { label: "Revenue", value: "$142K", change: "+18%" },
                    { label: "ROI", value: "3.2x", change: "+0.4x" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="bg-secondary/50 rounded-xl p-3 sm:p-4"
                    >
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-success font-medium mt-1">
                        {stat.change}
                      </p>
                    </motion.div>
                  ))}
                </div>
                {/* Chart bars visual */}
                <div className="mt-4 flex items-end gap-1.5 h-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${30 + Math.random() * 70}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.03, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-primary/40 to-primary/80 rounded-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {t("features.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <Card hover padding="lg" className="h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {featureIcons[i]}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Social proof / Stats */}
      <section className="py-20 sm:py-28 bg-card/50 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {t("social.title")}
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <StaggerItem key={i} className="text-center">
                <motion.p
                  className="font-display text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", bounce: 0.3 }}
                >
                  {stat.value}
                </motion.p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative bg-gradient-to-br from-primary to-accent rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <div className="relative z-10">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {t("hero.cta")}
                </h2>
                <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                  {t("hero.subtitle")}
                </p>
                <Link
                  href={`/${locale}/audit`}
                  className="inline-block mt-8 px-8 py-3.5 rounded-xl bg-white text-primary
                             font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  {t("hero.cta")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
