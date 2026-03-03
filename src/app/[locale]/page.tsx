"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";

const featureIcons = [
  <svg key="analysis" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  <svg key="money" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="growth" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  <svg key="speed" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

const featureGradients = [
  "from-violet-500/20 to-indigo-500/20 border-violet-500/30",
  "from-pink-500/20 to-rose-500/20 border-pink-500/30",
  "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
  "from-amber-500/20 to-orange-500/20 border-amber-500/30",
];

const featureIconColors = [
  "text-violet-500 bg-violet-500/15",
  "text-pink-500 bg-pink-500/15",
  "text-emerald-500 bg-emerald-500/15",
  "text-amber-500 bg-amber-500/15",
];

// Fixed chart heights to avoid hydration mismatch
const chartHeights = [45, 72, 58, 85, 63, 91, 44, 78, 55, 88, 67, 95, 51, 73, 60, 84, 49, 76, 62, 89];

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  const features = t.raw("features.items") as Array<{ title: string; description: string }>;
  const stats = t.raw("social.stats") as Array<{ value: string; label: string }>;

  return (
    <div className="overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative min-h-[90vh] flex items-center py-20 sm:py-28">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-5xl mx-auto">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-8 backdrop-blur-sm">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
                />
                {t("hero.badge")}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-foreground leading-[1.05] mb-6">
                <span className="block">{t("hero.title").split(" ").slice(0, 3).join(" ")}</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-violet-500 bg-clip-text text-transparent">
                  {t("hero.title").split(" ").slice(3).join(" ")}
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
                {t("hero.subtitle")}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href={`/${locale}/audit`}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-8 py-4 rounded-2xl font-bold text-lg text-white overflow-hidden cursor-pointer select-none"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #ec4899)" }}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center gap-2">
                      {t("hero.cta")}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                  </motion.div>
                </Link>
                <Link href={`/${locale}/pricing`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-border/80 text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer select-none backdrop-blur-sm"
                  >
                    {t("hero.ctaSecondary")}
                  </motion.div>
                </Link>
              </div>
            </FadeIn>

            {/* Hero Dashboard Mock */}
            <FadeIn delay={0.5}>
              <div className="mt-16 sm:mt-20 relative max-w-4xl mx-auto">
                {/* Glow behind the card */}
                <div className="absolute inset-x-10 bottom-0 h-20 bg-primary/30 blur-3xl rounded-full" />
                <div className="relative bg-card/80 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/20">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="flex-1 mx-4 h-7 bg-secondary/70 rounded-lg flex items-center px-3">
                      <span className="text-xs text-muted-foreground font-mono">auditai.app/dashboard</span>
                    </div>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
                    {[
                      { label: "Leads/mo", value: "2,847", change: "+23%", color: "text-emerald-500" },
                      { label: "Revenue", value: "$142K", change: "+18%", color: "text-emerald-500" },
                      { label: "Losses ⚠️", value: "$8,200", change: "Blocked", color: "text-red-500" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="bg-secondary/50 rounded-xl p-3 sm:p-4 border border-border/40"
                      >
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                        <p className={`text-xs font-semibold mt-1 ${stat.color}`}>{stat.change}</p>
                      </motion.div>
                    ))}
                  </div>
                  {/* Chart */}
                  <div className="flex items-end gap-1 h-16 sm:h-20">
                    {chartHeights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 + i * 0.025, duration: 0.4, ease: "easeOut" }}
                        style={{ height: `${h}%`, originY: 1 }}
                        className={`flex-1 rounded-sm ${
                          i >= 16 ? "bg-gradient-to-t from-primary to-accent" : "bg-gradient-to-t from-primary/60 to-primary/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
              {t("features.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t("features.subtitle")}
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`h-full p-6 rounded-2xl border bg-gradient-to-br ${featureGradients[i]} backdrop-blur-sm`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${featureIconColors[i]}`}>
                    {featureIcons[i]}
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== STATS / SOCIAL PROOF ========== */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-foreground">
              {t("social.title")}
            </h2>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="text-center p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-lg"
                >
                  <motion.p
                    className="font-display text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative rounded-3xl overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #ec4899 100%)" }} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}
              />
              <div className="relative z-10 p-10 sm:p-14 lg:p-20 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">
                    {t("hero.badge")}
                  </p>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                    {t("hero.cta")}
                  </h2>
                  <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
                    {t("hero.subtitle")}
                  </p>
                  <Link href={`/${locale}/audit`}>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-primary font-bold text-lg shadow-2xl cursor-pointer select-none"
                    >
                      {t("hero.cta")}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
