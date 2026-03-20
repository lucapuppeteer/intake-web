"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const chatMessages = [
  { role: "ai", text: "What symptoms are you experiencing?" },
  { role: "patient", text: "Persistent headache for 3 days, mild fever" },
  { role: "ai", text: "Any medications you're currently taking?" },
  { role: "patient", text: "Ibuprofen 200mg as needed" },
];

const dataFields = [
  { label: "Chief Complaint", value: "Headache, Fever" },
  { label: "Duration", value: "3 days" },
  { label: "Medications", value: "Ibuprofen 200mg" },
  { label: "Severity", value: "Moderate (6/10)" },
];

const CYCLE_DURATION = 8000;

export function IntakeFlowAnimation() {
  const shouldReduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCycle((c) => c + 1), CYCLE_DURATION);
    return () => clearInterval(timer);
  }, []);

  if (shouldReduce) {
    return <StaticView />;
  }

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="rounded-lg border bg-card shadow-xl shadow-primary/5">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 text-xs font-medium text-muted-foreground">
            IntakeAI Session
          </span>
        </div>

        <div className="min-h-[450px]">
          <AnimatedContent key={cycle} />
        </div>
      </div>
    </div>
  );
}

function AnimatedContent() {
  return (
    <div className="p-5">
      <div className="space-y-3">
        {chatMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.7 + 0.4, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={`flex ${msg.role === "patient" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm ${
                msg.role === "ai"
                  ? "bg-muted text-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ delay: 3.4, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-4 overflow-hidden"
      >
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
            Captured Data
          </p>
          <div className="grid grid-cols-2 gap-3">
            {dataFields.map((field, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8 + i * 0.15, duration: 0.25 }}
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {field.label}
                </p>
                <p className="mt-0.5 text-xs font-semibold">{field.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.8, duration: 0.35 }}
        className="mt-3 flex items-center gap-2 rounded-lg bg-accent/10 px-3.5 py-2.5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 5, type: "spring", stiffness: 400, damping: 15 }}
        >
          <svg
            className="h-4 w-4 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </motion.div>
        <span className="text-xs font-medium text-accent">
          Data synced to EHR &middot; Diagnosis draft ready
        </span>
      </motion.div>
    </div>
  );
}

function StaticView() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="rounded-lg border bg-card shadow-xl shadow-primary/5">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <div className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 text-xs font-medium text-muted-foreground">
            IntakeAI Session
          </span>
        </div>
        <div className="p-5">
          <div className="space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm ${
                    msg.role === "ai"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border bg-muted/50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
              Captured Data
            </p>
            <div className="grid grid-cols-2 gap-3">
              {dataFields.map((field, i) => (
                <div key={i}>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {field.label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-accent/10 px-3.5 py-2.5">
            <svg
              className="h-4 w-4 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-xs font-medium text-accent">
              Data synced to EHR &middot; Diagnosis draft ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
