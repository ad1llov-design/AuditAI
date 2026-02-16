import { AuditData, FunnelMetrics } from "./calculations";

export interface AIAnalysisResult {
  riskLevel: "low" | "medium" | "high" | "critical";
  riskScore: number;
  recommendations: string[];
  strategy: string[];
  summary: string;
}

const nicheNames = ["E-commerce", "SaaS/IT", "Services", "Education", "Healthcare", "Other"];
const adPlatformNames = ["Google Ads", "Facebook/Instagram", "TikTok", "LinkedIn", "None", "Multiple"];

export async function generateAIAnalysis(
  data: AuditData,
  metrics: FunnelMetrics
): Promise<AIAnalysisResult> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Calculate risk score based on inputs
  let riskScore = 0;

  // No CRM = +20 risk
  if (data.hasCRM === 1) riskScore += 20;
  if (data.hasCRM === 3) riskScore += 10;

  // No sales team = +15 risk
  if (data.hasSalesTeam === 1) riskScore += 15;
  if (data.hasSalesTeam === 3) riskScore += 10;

  // Poor social media = +15 risk
  if (data.socialMedia >= 2) riskScore += 15;

  // No advertising = +20 risk
  if (data.adPlatform === 4) riskScore += 20;

  // Low conversion = +10 risk
  if (data.conversionRate <= 1) riskScore += 10;

  // Don't know conversion = +15 risk
  if (data.conversionRate === 5) riskScore += 15;

  // High budget requirement relative to revenue = +10 risk
  if (metrics.estimatedBudget > metrics.targetClients * 100) riskScore += 10;

  const riskLevel: AIAnalysisResult["riskLevel"] =
    riskScore <= 20 ? "low" : riskScore <= 40 ? "medium" : riskScore <= 60 ? "high" : "critical";

  // Generate recommendations
  const recommendations: string[] = [];

  if (data.hasCRM >= 1) {
    recommendations.push(
      "Implement a CRM system (e.g., HubSpot, Salesforce) to track leads and customer interactions. Expected improvement: 20-30% in lead conversion."
    );
  }

  if (data.hasSalesTeam >= 1) {
    recommendations.push(
      "Build or strengthen your sales team. A dedicated sales force can improve close rates by 25-40%."
    );
  }

  if (data.socialMedia >= 2) {
    recommendations.push(
      "Develop a consistent social media strategy. Active presence on 2-3 key platforms can reduce CAC by 15-25%."
    );
  }

  if (data.adPlatform === 4) {
    recommendations.push(
      `Start with ${nicheNames[data.niche] === "SaaS/IT" ? "Google Ads and LinkedIn" : "Google Ads and Facebook"} for your ${nicheNames[data.niche]} niche.`
    );
  }

  if (data.conversionRate <= 1 || data.conversionRate === 5) {
    recommendations.push(
      "Focus on conversion rate optimization (CRO). A/B test landing pages, improve CTAs, and streamline the checkout process."
    );
  }

  if (metrics.potentialLosses > 0) {
    recommendations.push(
      `Address identified gaps to potentially save $${metrics.potentialLosses.toLocaleString()}/month in wasted marketing spend.`
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Your marketing foundation is strong. Focus on scaling what works and testing new channels.",
      "Consider implementing marketing automation to improve efficiency by 15-20%."
    );
  }

  // Generate growth strategy
  const strategy: string[] = [];

  strategy.push(
    `Phase 1 (Month 1-2): Optimize your ${adPlatformNames[data.adPlatform] || "advertising"} campaigns. Target CPA reduction of 15%.`
  );

  strategy.push(
    `Phase 2 (Month 2-4): Scale lead generation to ${metrics.requiredLeads} leads/month through multi-channel approach.`
  );

  strategy.push(
    `Phase 3 (Month 4-6): Achieve ${metrics.targetClients} clients/month with improved conversion rate of ${(metrics.conversionRate * 1.3).toFixed(1)}%.`
  );

  strategy.push(
    "Phase 4 (Month 6+): Implement retention strategies and expand to new market segments for sustainable growth."
  );

  const summary = `Based on your ${nicheNames[data.niche]} business profile, you need approximately ${metrics.requiredLeads} leads per month to achieve your revenue target. With a projected budget of $${metrics.estimatedBudget.toLocaleString()}, the estimated ROI is ${((metrics.targetClients * (metrics.estimatedBudget / metrics.requiredLeads) * 3) / metrics.estimatedBudget).toFixed(1)}x. ${riskLevel === "low" || riskLevel === "medium" ? "Your risk profile is manageable." : "Immediate action is recommended to address critical gaps."}`;

  return {
    riskLevel,
    riskScore,
    recommendations,
    strategy,
    summary,
  };
}
