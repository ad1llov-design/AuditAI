"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useUser, UserRole } from "@/context/UserContext";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";

const planKeys = ["free", "pro", "business", "enterprise"] as const;
const planRoles: Record<string, UserRole> = {
  free: "user",
  pro: "pro",
  business: "business",
  enterprise: "enterprise",
};

export default function PricingPage() {
  const t = useTranslations("pricing");
  const { role, setRole } = useUser();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium transition-colors ${
                !isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t("monthly")}
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-12 h-6 rounded-full bg-secondary transition-colors"
            >
              <motion.div
                animate={{ x: isYearly ? 24 : 2 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-primary"
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                isYearly ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t("yearly")}
            </span>
            {isYearly && (
              <Badge variant="success" className="ml-1">
                {t("save")}
              </Badge>
            )}
          </div>
        </FadeIn>

        {/* Plans Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {planKeys.map((key, i) => {
            const plan = t.raw(`plans.${key}`) as {
              name: string;
              price: string;
              priceYearly: string;
              description: string;
              features: string[];
            };
            const isPopular = key === "pro";
            const isCurrent = role === planRoles[key];
            const price = isYearly ? plan.priceYearly : plan.price;
            const isCustom = price === "Custom" || price === "Индивидуально" || price === "Жеке";

            return (
              <StaggerItem key={key}>
                <Card
                  hover
                  padding="lg"
                  className={`relative h-full flex flex-col ${
                    isPopular ? "border-primary/50 shadow-lg shadow-primary/10" : ""
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="accent">{t("popular")}</Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    {isCustom ? (
                      <p className="font-display text-3xl font-bold text-foreground">
                        {price}
                      </p>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-4xl font-bold text-foreground">
                          ${price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t("perMonth")}
                        </span>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature: string, fi: number) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-success shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setRole(planRoles[key])}
                    disabled={isCurrent}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isCurrent
                        ? "bg-secondary text-muted-foreground cursor-default"
                        : isPopular
                        ? "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                        : "border border-border text-foreground hover:bg-secondary"
                    }`}
                  >
                    {isCurrent ? t("currentPlan") : t("selectPlan")}
                  </button>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
