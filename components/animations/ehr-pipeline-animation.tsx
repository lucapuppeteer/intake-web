"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageSquare, Database, FileCheck, ArrowRight } from "lucide-react";

const stages = [
  {
    icon: MessageSquare,
    label: "AI Intake",
    description: "Smart conversational intake",
  },
  {
    icon: Database,
    label: "EHR Sync",
    description: "Auto-populates patient records",
  },
  {
    icon: FileCheck,
    label: "Diagnosis Draft",
    description: "AI-generated clinical summary",
  },
];

export function EhrPipelineAnimation() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-4">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-4">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-card text-primary shadow-sm">
              <stage.icon className="h-7 w-7" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">{stage.label}</p>
              <p className="max-w-[140px] text-xs text-muted-foreground">
                {stage.description}
              </p>
            </div>
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              initial={shouldReduce ? {} : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.15, duration: 0.3 }}
              className="hidden text-muted-foreground/40 sm:block"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
