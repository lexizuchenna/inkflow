"use client";

import React from "react";
import { CheckCircle2, XCircle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type AlertType = "success" | "error" | "info" | "warning";

interface AlertConfig {
  type: AlertType;
  title: string;
  message: string;
}

interface AlertUIProps {
  isOpen: boolean;
  config: AlertConfig;
  onClose: () => void;
}

interface ModeStyle {
  icon: React.ReactElement;
  glow: string;
  accentColor: string;
}

const AlertUI: React.FC<AlertUIProps> = ({ isOpen, config, onClose }) => {
  const modes: Record<AlertType, ModeStyle> = {
    success: {
      icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
      glow: "bg-emerald-500/10",
      accentColor: "bg-emerald-500",
    },
    error: {
      icon: <XCircle className="w-8 h-8 text-red-500" />,
      glow: "bg-red-500/10",
      accentColor: "bg-red-500",
    },
    info: {
      icon: <Info className="w-8 h-8 text-accent-primary" />,
      glow: "bg-accent-primary/10",
      accentColor: "bg-accent-primary",
    },
    warning: {
      icon: <AlertCircle className="w-8 h-8 text-amber-500" />,
      glow: "bg-amber-500/10",
      accentColor: "bg-amber-500",
    },
  };

  const style = modes[config.type] || modes.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-secondary/80"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", damping: 25, stiffness: 400 },
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-bg-secondary border border-border rounded-[3rem] p-10 shadow-2xl text-center"
          >
            {/* Icon Header */}
            <div
              className={cn(
                "mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 relative",
                style.glow
              )}
            >
              <div className="relative z-10">{style.icon}</div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.2 }}
                className={cn(
                  "absolute inset-0 blur-2xl rounded-full",
                  style.accentColor
                )}
              />
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight">
              {config.title}
            </h3>
            <p className="text-foreground/50 font-medium mb-10 leading-relaxed text-sm">
              {config.message}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm shadow-xl shadow-white/5 cursor-pointer"
            >
              Got it
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AlertUI;
