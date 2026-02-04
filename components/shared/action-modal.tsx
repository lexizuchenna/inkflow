"use client";

import { useState, useImperativeHandle, forwardRef } from "react";
import { AlertCircle, CheckCircle2, Info, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const ActionModal = forwardRef(
  ({ onConfirm }: { onConfirm: (data: any, mode: string) => any }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [config, setConfig] = useState<ActionModalOptions>({
      mode: "default",
      title: "",
      message: "",
      confirmText: "Confirm",
      fields: [],
      data: null,
    });

    useImperativeHandle(ref, () => ({
      open: (options: ActionModalOptions) => {
        setConfig({
          mode: options.mode || "default",
          title: options.title || "Are you sure?",
          message: options.message || "Please confirm this action.",
          confirmText:
            options.confirmText ||
            (options.mode === "delete" ? "Delete" : "Proceed"),
          fields: options.fields || [],
          data: options.data || null,
        });
        setFormData({});
        setErrors({});
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }));

    const validate = () => {
      const newErrors: Record<string, string> = {};
      config.fields &&
        config.fields.forEach(
          (field: {
            name: string;
            label: string;
            type: string;
            required: boolean;
            match?: string;
          }) => {
            if (
              field.match &&
              field.match.trim().toLowerCase() !==
                formData[field.name]?.trim().toLowerCase()
            ) {
              newErrors[field.name] = "Text does not match";
            }

            if (field.required && !formData[field.name]) {
              newErrors[field.name] = `${field.label} is required`;
            }
          }
        );
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleAction = async () => {
      if (!validate()) return;
      setLoading(true);
      try {
        await onConfirm({ ...config.data, ...formData }, config.mode);
        setIsOpen(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!isOpen) return null;

    const modes = {
      delete: {
        icon: <Trash2 className="w-6 h-6 text-red-500" />,
        color: "text-red-500",
        glow: "bg-red-500/10",
        btn: "bg-red-500 hover:bg-red-600 text-white",
      },
      info: {
        icon: <Info className="w-6 h-6 text-accent-primary" />,
        color: "text-accent-primary",
        glow: "bg-accent-primary/10",
        btn: "bg-foreground text-background dark:bg-white dark:text-black",
      },
      success: {
        icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
        color: "text-emerald-500",
        glow: "bg-emerald-500/10",
        btn: "bg-emerald-500 hover:bg-emerald-600 text-white",
      },
      default: {
        icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
        color: "text-amber-500",
        glow: "bg-amber-500/10",
        btn: "bg-foreground text-background dark:bg-white dark:text-black",
      },
    };

    const current = modes[config.mode as keyof typeof modes] || modes.default;

    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !loading && setIsOpen(false)}
          className="absolute inset-0 bg-background/80"
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
          className="relative w-full max-w-lg bg-background border border-border rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="p-8 sm:p-10">
            <div className="flex flex-col items-center text-center mb-8">
              <div
                className={cn("p-5 rounded-[2rem] mb-6 relative", current.glow)}
              >
                <div className="relative z-10">{current.icon}</div>
                <div className="absolute inset-0 blur-xl rounded-full bg-current opacity-20" />
              </div>
              <h2
                className="text-3xl font-serif font-bold text-foreground mb-3 tracking-tight"
                dangerouslySetInnerHTML={{ __html: config.title ?? "" }}
              />
              <p
                className="text-foreground/50 font-medium leading-relaxed max-w-xs"
                dangerouslySetInnerHTML={{ __html: config.message ?? "" }}
              />
            </div>

            {config.fields && config.fields.length > 0 && (
              <div className="space-y-4 mb-8">
                {config.fields.map((field: any) => (
                  <div key={field.name} className="space-y-1.5">
                    <label
                      className="text-[10px] uppercase tracking-widest text-foreground/40 ml-4"
                      dangerouslySetInnerHTML={{ __html: field.label }}
                    />

                    {field.required && <span className="text-red-500">*</span>}

                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      className={cn(
                        "w-full bg-foreground/[0.03] border border-border rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-primary/20 transition-all",
                        errors[field.name] &&
                          "border-red-500/50 bg-red-500/[0.02]"
                      )}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                    />
                    {errors[field.name] && (
                      <p className="text-[10px] text-red-500 font-bold ml-4 uppercase tracking-tight">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={loading}
                onClick={() => setIsOpen(false)}
                className="flex-1 px-8 py-4 rounded-2xl bg-foreground/5 text-foreground/60 font-bold hover:bg-foreground/10 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleAction}
                className={cn(
                  "flex-[1.5] px-8 py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 cursor-pointer",
                  current.btn
                )}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  config.confirmText
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

ActionModal.displayName = "ActionModal";
export default ActionModal;
