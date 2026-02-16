"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AuditForm } from "@/components/audit/AuditForm";
import { AuditResults } from "@/components/audit/AuditResults";
import { AuditData, calculateFunnel, FunnelMetrics } from "@/lib/calculations";
import { generateAIAnalysis, AIAnalysisResult } from "@/lib/ai-analysis";
import { FadeIn } from "@/components/ui/MotionWrapper";
import { useUser } from "@/context/UserContext";

export default function AuditPage() {
  const t = useTranslations("audit");
  const { hasAccess } = useUser();
  const [showResults, setShowResults] = useState(false);
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (data: AuditData) => {
    const funnelMetrics = calculateFunnel(data);
    setMetrics(funnelMetrics);
    setShowResults(true);

    if (hasAccess("ai")) {
      setIsAnalyzing(true);
      try {
        const analysis = await generateAIAnalysis(data, funnelMetrics);
        setAiAnalysis(analysis);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleRestart = () => {
    setShowResults(false);
    setMetrics(null);
    setAiAnalysis(null);
  };

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showResults ? (
          <>
            <FadeIn className="text-center mb-12">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {t("title")}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {t("subtitle")}
              </p>
            </FadeIn>
            <AuditForm onSubmit={handleSubmit} />
          </>
        ) : metrics ? (
          <AuditResults
            metrics={metrics}
            aiAnalysis={aiAnalysis}
            isAnalyzing={isAnalyzing}
            onRestart={handleRestart}
          />
        ) : null}
      </div>
    </section>
  );
}
