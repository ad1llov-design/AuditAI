export interface AuditData {
  isOwner: number;
  hasCRM: number;
  hasSalesTeam: number;
  socialMedia: number;
  niche: number;
  adPlatform: number;
  revenueGoal: number;
  averageCheck: number;
  conversionRate: number;
}

export interface FunnelMetrics {
  targetClients: number;
  requiredLeads: number;
  estimatedBudget: number;
  potentialLosses: number;
  conversionRate: number;
  costPerLead: number;
}

const revenueGoalMap: Record<number, number> = {
  0: 3000,
  1: 12500,
  2: 35000,
  3: 75000,
  4: 150000,
};

const avgCheckMap: Record<number, number> = {
  0: 30,
  1: 125,
  2: 350,
  3: 750,
  4: 1500,
};

const conversionMap: Record<number, number> = {
  0: 0.5,
  1: 2,
  2: 4,
  3: 7.5,
  4: 12,
  5: 2,
};

const cplByNiche: Record<number, number> = {
  0: 8,
  1: 25,
  2: 15,
  3: 12,
  4: 20,
  5: 18,
};

export function calculateFunnel(data: AuditData): FunnelMetrics {
  const monthlyRevenue = revenueGoalMap[data.revenueGoal] || 10000;
  const avgCheck = avgCheckMap[data.averageCheck] || 100;
  const convRate = conversionMap[data.conversionRate] || 2;
  const costPerLead = cplByNiche[data.niche] || 15;

  const targetClients = Math.ceil(monthlyRevenue / avgCheck);
  const requiredLeads = Math.ceil(targetClients / (convRate / 100));
  const estimatedBudget = Math.ceil(requiredLeads * costPerLead);

  // Losses: if no CRM, no sales team, poor social = wasted spend
  let lossMultiplier = 1;
  if (data.hasCRM >= 1) lossMultiplier += 0.15;
  if (data.hasSalesTeam >= 1) lossMultiplier += 0.1;
  if (data.socialMedia >= 2) lossMultiplier += 0.1;
  if (data.adPlatform === 4) lossMultiplier += 0.2;

  const potentialLosses = Math.ceil(estimatedBudget * (lossMultiplier - 1));

  return {
    targetClients,
    requiredLeads,
    estimatedBudget,
    potentialLosses,
    conversionRate: convRate,
    costPerLead,
  };
}
