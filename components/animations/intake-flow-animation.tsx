"use client";

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

export function IntakeFlowAnimation() {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <StaticView />;
  }

  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* Device frame */}
      <div className="rounded-2xl border bg-card p-1 shadow-2xl shadow-primary/10">
        <div className="rounded-xl bg-muted/50 p-4">
          {/* Top bar */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <div className="h-3 w-3 rounded-full bg-green-400/60" />
            <span className="ml-2 text-xs text-muted-foreground">
              IntakeAI Session
            </span>
          </div>

          {/* Chat messages */}
          <div className="space-y-3">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.8 + 0.5, duration: 0.4 }}
                className={`flex ${msg.role === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "ai"
                      ? "bg-primary/10 text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Data capture overlay */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 3.8, duration: 0.5 }}
            className="mt-4 overflow-hidden"
          >
            <div className="rounded-lg border bg-card p-3">
              <p className="mb-2 text-xs font-semibold text-primary">
                Captured Data
              </p>
              <div className="grid grid-cols-2 gap-2">
                {dataFields.map((field, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.2 + i * 0.2, duration: 0.3 }}
                  >
                    <p className="text-[10px] text-muted-foreground">
                      {field.label}
                    </p>
                    <p className="text-xs font-medium">{field.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* EHR sync indicator */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.2, duration: 0.4 }}
            className="mt-3 flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 5.4, type: "spring", stiffness: 300 }}
            >
              <svg
                className="h-4 w-4 text-green-600 dark:text-green-400"
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
            <span className="text-xs font-medium text-green-700 dark:text-green-300">
              Data synced to EHR &middot; Diagnosis draft ready
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StaticView() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="rounded-2xl border bg-card p-1 shadow-2xl shadow-primary/10">
        <div className="rounded-xl bg-muted/50 p-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
            <div className="h-3 w-3 rounded-full bg-green-400/60" />
            <span className="ml-2 text-xs text-muted-foreground">
              IntakeAI Session
            </span>
          </div>
          <div className="space-y-3">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.role === "ai"
                      ? "bg-primary/10 text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border bg-card p-3">
            <p className="mb-2 text-xs font-semibold text-primary">
              Captured Data
            </p>
            <div className="grid grid-cols-2 gap-2">
              {dataFields.map((field, i) => (
                <div key={i}>
                  <p className="text-[10px] text-muted-foreground">
                    {field.label}
                  </p>
                  <p className="text-xs font-medium">{field.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2">
            <svg
              className="h-4 w-4 text-green-600 dark:text-green-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span className="text-xs font-medium text-green-700 dark:text-green-300">
              Data synced to EHR &middot; Diagnosis draft ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
