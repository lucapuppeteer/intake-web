"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageSquare, Database, FileCheck } from "lucide-react";

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
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-0">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex items-center">
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <stage.icon className="h-7 w-7" />
            </div>
            <p className="text-sm font-semibold">{stage.label}</p>
            <p className="max-w-[140px] text-center text-xs text-muted-foreground">
              {stage.description}
            </p>
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              initial={shouldReduce ? {} : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 + 0.2, duration: 0.4 }}
              className="mx-4 hidden h-0.5 w-16 origin-left bg-primary/30 sm:block"
            />
          )}
        </div>
      ))}
    </div>
  );
}
