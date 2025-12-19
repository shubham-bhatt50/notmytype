import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-medium px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary:
      "bg-primary-900 dark:bg-primary-50 hover:bg-primary-950 dark:hover:bg-primary-100 text-white dark:text-primary-900 hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "bg-white dark:bg-primary-800 border-2 border-primary-900 dark:border-primary-200 text-primary-900 dark:text-primary-50 hover:bg-primary-900 dark:hover:bg-primary-700 hover:text-white dark:hover:text-primary-50",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

