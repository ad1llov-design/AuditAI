"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FunnelMetrics } from "@/lib/calculations";
import { AIAnalysisResult } from "@/lib/ai-analysis";
import { useUser } from "@/context/UserContext";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";

interface AuditResultsProps {
  metrics: FunnelMetrics;
  aiAnalysis: AIAnalysisResult | null;
  isAnalyzing: boolean;
  onRestart: () => void;
}

const riskColors = {
  low: "success",
  medium: "warning",
  high: "danger",
  critical: "danger",
} as const;

const riskBgColors = {
  low: "bg-success",
  medium: "bg-warning",
  high: "bg-danger",
  critical: "bg-danger",
};

export function AuditResults({ metrics, aiAnalysis, isAnalyzing, onRestart }: AuditResultsProps) {
  const t = useTranslations("audit.results");
  const tRestrict = useTranslations("restrictions");
  const { hasAccess } = useUser();

  const metricItems = [
    {
      key: "leads",
      value: metrics.requiredLeads.toLocaleString(),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      key: "clients",
      value: metrics.targetClients.toLocaleString(),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      key: "budget",
      value: `$${metrics.estimatedBudget.toLocaleString()}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      key: "losses",
      value: `$${metrics.potentialLosses.toLocaleString()}`,
      style: "danger", // Special style tag
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
          <polyline points="17 18 23 18 23 12" />
        </svg>
      ),
    },
  ];

  // Funnel visualization
  const funnelSteps = [
    { label: "Impressions", value: metrics.requiredLeads * 50, width: "100%" },
    { label: "Clicks", value: metrics.requiredLeads * 10, width: "72%" },
    { label: "Leads", value: metrics.requiredLeads, width: "45%" },
    { label: "Clients", value: metrics.targetClients, width: "20%" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <FadeIn className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
          {t("title")}
        </h2>
      </FadeIn>

      {/* Metrics Grid */}
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricItems.map((item, i) => {
          const isDanger = item.style === "danger";
          return (
            <StaggerItem key={item.key}>
              <Card
                padding="md"
                className={`text-center h-full flex flex-col justify-center ${
                  isDanger ? "border-danger/50 bg-danger/5 shadow-lg shadow-danger/10" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                    isDanger ? "bg-danger/20 text-danger" : "bg-primary/10 text-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <motion.p
                  className={`text-2xl sm:text-3xl font-bold ${
                    isDanger ? "text-danger" : "text-foreground"
                  }`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                >
                  {item.value}
                </motion.p>
                <p className={`text-xs mt-1 ${isDanger ? "text-danger/80 font-semibold" : "text-muted-foreground"}`}>
                  {t(`metrics.${item.key}`).toUpperCase()}
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Funnel */}
      <FadeIn delay={0.3}>
        <Card padding="lg">
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">
            {t("funnel")}
          </h3>
          <div className="space-y-3">
            {funnelSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-20 text-right shrink-0">
                  {step.label}
                </span>
                <div className="flex-1 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: step.width }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                    className="h-10 rounded-lg bg-gradient-to-r from-primary/80 to-primary/40
                               flex items-center justify-end pr-3"
                  >
                    <span className="text-xs font-bold text-white">
                      {step.value.toLocaleString()}
                    </span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </FadeIn>

      {/* AI Analysis */}
      {hasAccess("ai") ? (
        <FadeIn delay={0.5}>
          <Card padding="lg" className="relative overflow-hidden border-primary/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2v1a4 4 0 0 1-8 0v-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2v-1a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2V6a4 4 0 0 1 4-4z" />
              </svg>
              {t("ai.title")}
            </h3>

            {isAnalyzing ? (
              <div className="flex items-center gap-3 py-8 justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                />
                <span className="text-sm text-muted-foreground">{t("ai.loading")}</span>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-6">
                {/* Summary */}
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {aiAnalysis.summary}
                </p>

                {/* Risk Level */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <span className="text-sm font-bold text-foreground">{t("ai.riskLevel")}:</span>
                  <Badge variant={riskColors[aiAnalysis.riskLevel]}>
                    {aiAnalysis.riskLevel.toUpperCase()} ({aiAnalysis.riskScore}/100)
                  </Badge>
                  <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${aiAnalysis.riskScore}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className={`h-full rounded-full ${riskBgColors[aiAnalysis.riskLevel]}`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recommendations */}
                  <div>
                    <h4 className="text-sm font-bold text-danger mb-3 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      {t("ai.recommendations")}
                    </h4>
                    <ul className="space-y-2">
                      {aiAnalysis.recommendations.map((rec, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="flex items-start gap-2 text-sm text-foreground/80 bg-danger/5 p-2 rounded-lg"
                        >
                          <span className="text-danger mt-0.5 shrink-0">!</span>
                          {rec}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Strategy */}
                  <div>
                    <h4 className="text-sm font-bold text-success mb-3 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                      {t("ai.strategy")}
                    </h4>
                    <div className="space-y-2">
                      {aiAnalysis.strategy.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 + i * 0.1 }}
                          className="flex items-start gap-3 p-2 rounded-lg bg-success/5"
                        >
                          <span className="w-5 h-5 rounded-full bg-success/20 text-success text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-sm text-foreground/80">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        </FadeIn>
      ) : (
        <FadeIn delay={0.5}>
          <Card padding="lg" className="text-center">
            <div className="py-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-muted-foreground mb-3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-sm text-muted-foreground">{tRestrict("aiLocked")}</p>
              <button className="mt-4 px-5 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground">
                {t("upgrade")}
              </button>
            </div>
          </Card>
        </FadeIn>
      )}

      {/* Main CTA */}
      <FadeIn delay={0.8}>
        <div className="relative bg-foreground rounded-3xl p-8 sm:p-10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-background mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-background/80 max-w-xl mx-auto mb-8 text-lg">
              {t("cta.text")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1">
                {t("cta.button")}
              </button>
              <button
                onClick={onRestart}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-background/20 text-background font-medium hover:bg-background/10 transition-all"
              >
                {t("restart")}
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
