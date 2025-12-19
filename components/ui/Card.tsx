import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => {
  const baseStyles =
    "bg-white dark:bg-primary-800 rounded-2xl shadow-md dark:shadow-lg border border-neutral-200 dark:border-primary-700 p-6 transition-shadow duration-300";
  
  const hoverStyles = hover
    ? "hover:shadow-xl hover:-translate-y-1"
    : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

