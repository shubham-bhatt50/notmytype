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
    default: "bg-neutral-100 text-neutral-700",
    purple: "bg-accent-purple/10 text-accent-purple",
    blue: "bg-accent-blue/10 text-accent-blue",
    mint: "bg-accent-mint/10 text-accent-mint",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

