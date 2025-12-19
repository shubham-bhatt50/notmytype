import React from "react";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "blue" | "mint";
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const variants = {
    default: "bg-neutral-100 dark:bg-primary-700 text-neutral-700 dark:text-neutral-300",
    purple: "bg-accent-purple/10 dark:bg-accent-purple/20 text-accent-purple",
    blue: "bg-accent-blue/10 dark:bg-accent-blue/20 text-accent-blue",
    mint: "bg-accent-mint/10 dark:bg-accent-mint/20 text-accent-mint",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

