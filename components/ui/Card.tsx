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
    "bg-white rounded-2xl shadow-md border border-neutral-200 p-6 transition-shadow duration-300";
  
  const hoverStyles = hover
    ? "hover:shadow-xl hover:-translate-y-1"
    : "";

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

