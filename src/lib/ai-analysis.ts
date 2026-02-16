import { AuditData, FunnelMetrics } from "./calculations";

export interface AIAnalysisResult {
  riskLevel: "low" | "medium" | "high" | "critical";
  riskScore: number;
  recommendations: string[];
  strategy: string[];
  summary: string;
}

const translations = {
  en: {
    niche: ["E-commerce", "SaaS/IT", "Services", "Education", "Healthcare", "Other"],
    platform: ["Google Ads", "Facebook/Instagram", "TikTok", "LinkedIn", "None", "Multiple"],
    rec: {
      crm: "CRITICAL: You are losing 30% of leads due to lack of CRM. Implement HubSpot/Salesforce immediately.",
      sales: "URGENT: Your sales process is unstructured. You are burning ad budget without closing deals.",
      social: "Missed Opportunity: Your competitors dominate social media. You are invisible to 60% of your audience.",
      ads: "Inefficient Spend: You are running ads blindly. Stop wasting budget until you have a strategy.",
      cro: "Money Leak: Your conversion rate is too low. You are paying for traffic that leaves immediately.",
      loss: "FINANCIAL ALERT: You are losing ${loss} monthly. Yearly that's ${yearlyLoss}. Fix this now.",
      scale: "Ready to Scale: But you need automation to handle 2x volume without chaos.",
    },
    strategy: {
      p1: "Month 1: STOP THE BLEEDING. Audit ad accounts, fix landing page, implement CRM.",
      p2: "Month 2: AGGRESSIVE GROWTH. Launch high-conversion campaigns, target CPA reduction by 20%.",
      p3: "Month 3: SCALE & DOMINATE. Double ad spend on winning channels, introduce retention sequences.",
      p4: "Month 4+: AUTOMATION. Remove yourself from operations, let AI handle 80% of routine.",
    },
    summary: "Audit for {niche} niche. Target: {leads} leads/mo. ROI Projection: {roi}x. CONCLUSION: Your current setup is burning cash. You need immediate intervention to stop losses and start growing.",
  },
  ru: {
    niche: ["E-commerce", "SaaS / IT", "Услуги", "Образование", "Здравоохранение", "Другое"],
    platform: ["Google Ads", "Facebook / Instagram", "TikTok", "LinkedIn", "Нет", "Несколько"],
    rec: {
      crm: "КРИТИЧНО: Вы теряете 30% заявок из-за отсутствия CRM. Срочно внедрите систему учета.",
      sales: "СРОЧНО: Ваш процесс продаж хаотичен. Вы сливаете рекламный бюджет впустую.",
      social: "Упущенная выгода: Конкуренты забирают ваших клиентов в соцсетях. Вас не видят 60% аудитории.",
      ads: "Слив бюджета: Реклама работает неэффективно. Остановите траты до разработки стратегии.",
      cro: "Утечка денег: Конверсия сайта ниже нормы. Вы платите за трафик, который уходит.",
      loss: "ФИНАНСОВАЯ ТРЕВОГА: Вы теряете ${loss} ежемесячно. В год это ${yearlyLoss}. Нужно исправлять немедленно.",
      scale: "Готовы к росту: Но без автоматизации масштабирование убьет процессы.",
    },
    strategy: {
      p1: "Месяц 1: ОСТАНОВИТЬ ПОТЕРИ. Аудит рекламы, правка лендинга, внедрение CRM.",
      p2: "Месяц 2: АГРЕССИВНЫЙ РОСТ. Запуск кампаний с высокой конверсией, снижение стоимости клиента на 20%.",
      p3: "Месяц 3: МАСШТАБИРОВАНИЕ. Удвоение бюджета на лучшие каналы, внедрение LTV-воронок.",
      p4: "Месяц 4+: АВТОМАТИЗАЦИЯ. Выход из операционки, AI заберет 80% рутины.",
    },
    summary: "Аудит ниши {niche}. Цель: {leads} лидов/мес. Прогноз ROI: {roi}x. ВЫВОД: Ваша текущая система сжигает деньги. Требуется немедленное вмешательство экспертов для остановки потерь.",
  },
  kg: {
    niche: ["E-commerce", "SaaS / IT", "Кызматтар", "Билим берүү", "Саламаттыкты сактоо", "Башка"],
    platform: ["Google Ads", "Facebook / Instagram", "TikTok", "LinkedIn", "Жок", "Бир нече"],
    rec: {
      crm: "КРИТИКАЛЫК: CRM жоктугунан кардарлардын 30% жоготуп жатасыз. Тезинен системаны киргизиңиз.",
      sales: "ШАШЫЛЫШ: Сиздин сатуу процессиңиз иретсиз. Сиз жарнак бюджетин текке кетирип жатасыз.",
      social: "Жоготулган мүмкүнчүлүк: Атаандаштар социалдык тармактарда кардарларыңызды тартып алууда.",
      ads: "Бюджетти коротуу: Жарнак натыйжасыз иштеп жатат. Стратегия түзүлгөнгө чейин чыгымдарды токтотуңуз.",
      cro: "Акчанын агып кетиши: Сайттын конверсиясы төмөн. Сиз келген трафик үчүн акча төлөп жатасыз, бирок алар кетип калууда.",
      loss: "ФИНАНСЫЛЫК КООКУНУЧ: Сиз ай сайын ${loss} жоготуп жатасыз. Жылына бул ${yearlyLoss}. Дароо оңдоо керек.",
      scale: "Өсүүгө даяр: Бирок автоматташтыруусуз масштаброо процесстерди өлтүрөт.",
    },
    strategy: {
      p1: "1-ай: ЖОГОТУУЛАРДЫ ТОКТОТУУ. Жарнак аудити, лендингди оңдоо, CRM киргизүү.",
      p2: "2-ай: АГРЕССИВДҮҮ ӨСҮҮ. Жогорку конверсиялуу кампанияларды баштоо, кардардын баасын 20% га төмөндөтүү.",
      p3: "3-ай: МАСШТАБ. Мыкты каналдарга бюджетти эки эсе көбөйтүү, LTV воронкаларын киргизүү.",
      p4: "4-ай+: АВТОМАТТАШТЫРУУ. Операциялык иштерден чыгуу, AI рутинанын 80% өзүнө алат.",
    },
    summary: "Ниша аудити {niche}. Максат: {leads} лид/ай. ROI болжолу: {roi}x. ЖЫЙЫНТЫК: Сиздин учурдагы системаңыз акчаны күйгүзүп жатат. Жоготууларды токтотуу үчүн тезинен эксперттердин кийлигишүүсү керек.",
  },
};

export async function generateAIAnalysis(
  data: AuditData,
  metrics: FunnelMetrics,
  locale: string = "en"
): Promise<AIAnalysisResult> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Default to English if locale not found
  const t = translations[locale as keyof typeof translations] || translations.en;

  // Calculate risk score based on inputs - AGGRESSIVE CALCULATION
  let riskScore = 0;

  // Base risk
  riskScore += 20;

  // No CRM = +25 risk (Critical)
  if (data.hasCRM === 1) riskScore += 25;
  if (data.hasCRM === 3) riskScore += 15;

  // No sales team = +20 risk
  if (data.hasSalesTeam === 1) riskScore += 20;
  if (data.hasSalesTeam === 3) riskScore += 15;

  // Poor social media = +15 risk
  if (data.socialMedia >= 2) riskScore += 15;

  // No advertising = +25 risk
  if (data.adPlatform === 4) riskScore += 25;

  // Low conversion = +20 risk
  if (data.conversionRate <= 1) riskScore += 20;
  if (data.conversionRate === 5) riskScore += 25; // Don't know is worse

  // Budget inefficiencies
  if (metrics.estimatedBudget > metrics.targetClients * 50) riskScore += 15;

  // Cap at 95
  riskScore = Math.min(95, riskScore);

  const riskLevel: AIAnalysisResult["riskLevel"] =
    riskScore <= 40 ? "medium" : riskScore <= 70 ? "high" : "critical";

  // Generate recommendations
  const recommendations: string[] = [];

  if (data.hasCRM >= 1) recommendations.push(t.rec.crm);
  if (data.hasSalesTeam >= 1) recommendations.push(t.rec.sales);
  if (data.socialMedia >= 2) recommendations.push(t.rec.social);
  if (data.adPlatform === 4) recommendations.push(t.rec.ads);
  if (data.conversionRate <= 1 || data.conversionRate === 5) recommendations.push(t.rec.cro);

  if (metrics.potentialLosses > 0) {
    const lossStr = `$${metrics.potentialLosses.toLocaleString()}`;
    const yearlyLossStr = `$${(metrics.potentialLosses * 12).toLocaleString()}`;
    recommendations.push(
      t.rec.loss.replace("${loss}", lossStr).replace("${yearlyLoss}", yearlyLossStr)
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(t.rec.scale);
  }

  // Generate growth strategy
  const strategy: string[] = [t.strategy.p1, t.strategy.p2, t.strategy.p3, t.strategy.p4];

  const summary = t.summary
    .replace("{niche}", t.niche[data.niche] || data.niche.toString())
    .replace("{leads}", metrics.requiredLeads.toString())
    .replace(
      "{roi}",
      isNaN(metrics.estimatedBudget) || metrics.estimatedBudget === 0 
        ? "0" 
        : ((metrics.targetClients * (metrics.estimatedBudget / Math.max(1, metrics.requiredLeads)) * 3) / metrics.estimatedBudget).toFixed(1)
    );

  return {
    riskLevel,
    riskScore,
    recommendations: recommendations.slice(0, 5), // Top 5 critical issues
    strategy,
    summary,
  };
}
