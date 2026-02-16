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
        {metricItems.map((item, i) => (
          <StaggerItem key={item.key}>
            <Card padding="md" className="text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <motion.p
                className="text-2xl sm:text-3xl font-bold text-foreground"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              >
                {item.value}
              </motion.p>
              <p className="text-xs text-muted-foreground mt-1">
                {t(`metrics.${item.key}`)}
              </p>
            </Card>
          </StaggerItem>
        ))}
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
          <Card padding="lg" className="relative overflow-hidden">
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {aiAnalysis.summary}
                </p>

                {/* Risk Level */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{t("ai.riskLevel")}:</span>
                  <Badge variant={riskColors[aiAnalysis.riskLevel]}>
                    {aiAnalysis.riskLevel.toUpperCase()} ({aiAnalysis.riskScore}/100)
                  </Badge>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${aiAnalysis.riskScore}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className={`h-full rounded-full ${riskBgColors[aiAnalysis.riskLevel]}`}
                    />
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {t("ai.recommendations")}
                  </h4>
                  <ul className="space-y-2">
                    {aiAnalysis.recommendations.map((rec, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-0.5 shrink-0">→</span>
                        {rec}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Strategy */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {t("ai.strategy")}
                  </h4>
                  <div className="space-y-2">
                    {aiAnalysis.strategy.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                      >
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-muted-foreground">{step}</p>
                      </motion.div>
                    ))}
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

      {/* Restart */}
      <FadeIn delay={0.6} className="text-center">
        <button
          onClick={onRestart}
          className="px-6 py-2.5 rounded-xl text-sm font-medium border border-border
                     text-foreground hover:bg-secondary transition-all"
        >
          {t("restart")}
        </button>
      </FadeIn>
    </div>
  );
}
