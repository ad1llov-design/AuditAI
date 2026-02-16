"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { AuditData } from "@/lib/calculations";

interface AuditFormProps {
  onSubmit: (data: AuditData) => void;
}

export function AuditForm({ onSubmit }: AuditFormProps) {
  const t = useTranslations("audit");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1));

  const questionKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];
  const totalSteps = questionKeys.length;

  const currentQuestion = t.raw(`questions.${questionKeys[step]}`) as {
    title: string;
    options: string[];
  };

  const selectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = optionIndex;
    setAnswers(newAnswers);
  };

  const canGoNext = answers[step] !== -1;

  const handleSubmit = () => {
    const data: AuditData = {
      isOwner: answers[0],
      hasCRM: answers[1],
      hasSalesTeam: answers[2],
      socialMedia: answers[3],
      niche: answers[4],
      adPlatform: answers[5],
      revenueGoal: answers[6],
      averageCheck: answers[7],
      conversionRate: answers[8],
    };
    onSubmit(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">
            {t("step")} {step + 1} {t("of")} {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(((step + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8">
            {currentQuestion.title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option: string, i: number) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => selectOption(i)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  answers[step] === i
                    ? "border-primary bg-primary/5 text-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/30 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      answers[step] === i
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {answers[step] === i && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-5 py-2.5 rounded-xl text-sm font-medium border border-border
                     text-foreground hover:bg-secondary transition-all
                     disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {t("prev")}
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canGoNext}
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-primary
                       text-primary-foreground hover:opacity-90 transition-all
                       shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t("next")}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answers.includes(-1)}
            className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r
                       from-primary to-accent text-white hover:opacity-90
                       transition-all shadow-lg shadow-primary/25
                       disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {t("submit")}
          </button>
        )}
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-center gap-1.5 mt-8">
        {questionKeys.map((_, i) => (
          <button
            key={i}
            onClick={() => i <= step && setStep(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === step
                ? "bg-primary w-6"
                : i < step
                ? "bg-primary/40 cursor-pointer"
                : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
