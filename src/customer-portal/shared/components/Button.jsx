import React from "react";
import { cn } from "../../utils/helpers";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-customer-brand-500 hover:bg-customer-brand-600 text-white shadow-soft hover:shadow-medium focus:ring-customer-brand-500",
    secondary:
      "border-2 border-customer-brand-500 text-customer-brand-500 hover:bg-customer-brand-500 hover:text-white focus:ring-customer-brand-500",
    ghost:
      "text-customer-brand-500 hover:bg-customer-brand-50 focus:ring-customer-brand-500",
    danger:
      "bg-customer-error-500 hover:bg-customer-error-600 text-white shadow-soft hover:shadow-medium focus:ring-customer-error-500",
    success:
      "bg-customer-success-500 hover:bg-customer-success-600 text-white shadow-soft hover:shadow-medium focus:ring-customer-success-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className="mr-2">{icon}</span>
      )}

      {children}

      {!loading && icon && iconPosition === "right" && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
