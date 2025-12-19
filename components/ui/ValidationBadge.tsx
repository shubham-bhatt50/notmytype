"use client";

import React, { useEffect, useState } from "react";

interface ValidationBadgeProps {
  score: "excellent" | "acceptable" | "poor";
  message?: string;
  className?: string;
}

export const ValidationBadge: React.FC<ValidationBadgeProps> = ({
  score,
  message,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const config = {
    excellent: {
      bg: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
      label: "Excellent pairing",
    },
    acceptable: {
      bg: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
      label: "Acceptable pairing",
    },
    poor: {
      bg: "bg-error/10",
      text: "text-error",
      border: "border-error/20",
      label: "Not recommended",
    },
  };

  const { bg, text, border, label } = config[score];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${bg} ${text} ${border} ${className} transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      title={message}
    >
      <div className={`w-2 h-2 rounded-full ${text.replace("text-", "bg-")}`} />
      <span className="text-sm font-medium">{message || label}</span>
    </div>
  );
};

