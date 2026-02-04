"use client";

import React, { createContext, useState, useCallback, useContext } from "react";
import AlertUI from "@/components/shared/alert-ui";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertOptions {
  title?: string;
  message: string;
  onClose?: () => void;
}

interface AlertContextType {
  alert: (type: AlertType, options: AlertOptions) => void;
  success: (message: string, onClose?: () => void, title?: string) => void;
  error: (message: string, onClose?: () => void, title?: string) => void;
  info: (message: string, onClose?: () => void, title?: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    type: AlertType;
    title: string;
    message: string;
  }>({
    type: "info",
    title: "",
    message: "",
  });

  const showAlert = useCallback(
    (type: AlertType, { title, message, onClose }: AlertOptions) => {
      setConfig({
        type,
        title: title || type.charAt(0).toUpperCase() + type.slice(1),
        message,
      });
      setIsOpen(true);
      onClose && onClose();
    },
    []
  );

  const api = {
    alert: showAlert,
    success: (message: string, onClose?: () => void, title = "Success") =>
      showAlert("success", { title, message, onClose }),
    error: (message: string, onClose?: () => void, title = "Error") =>
      showAlert("error", { title, message, onClose }),
    info: (message: string, onClose?: () => void, title = "Notice") =>
      showAlert("info", { title, message, onClose }),
  };

  return (
    <AlertContext.Provider value={api}>
      {children}
      <AlertUI
        isOpen={isOpen}
        config={config}
        onClose={() => setIsOpen(false)}
      />
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
};
