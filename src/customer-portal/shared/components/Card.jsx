import React from "react";
import { cn } from "../../utils/helpers";

const Card = ({
  children,
  variant = "default",
  className = "",
  hover = false,
  ...props
}) => {
  const baseClasses =
    "bg-customer-ui-surface rounded-2xl border border-customer-ui-border";

  const variants = {
    default: "shadow-soft",
    elevated: "shadow-medium",
    flat: "shadow-none",
  };

  const hoverClasses = hover
    ? "hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
    : "";

  const classes = cn(baseClasses, variants[variant], hoverClasses, className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div
      className={cn("px-6 py-4 border-b border-customer-ui-border", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardBody = ({ children, className = "", ...props }) => {
  return (
    <div className={cn("px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={cn("px-6 py-4 border-t border-customer-ui-border", className)}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
