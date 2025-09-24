// Customer Portal Module
// This file serves as the entry point for the customer portal

// Layouts
export { default as CustomerLayout } from "./shared/layouts/CustomerLayout";

// Features
export * from "./features/home";
export * from "./features/features";
export * from "./features/packages";
export * from "./features/investment-plans";
export * from "./features/faq";
export * from "./features/contact";
export * from "./features/auth";
export * from "./features/dashboard";

// Shared Components
export * from "./shared/components";
export * from "./shared/partials";

// Utils
export * from "./utils/constants";
export * from "./utils/helpers";

// Store
export * from "./store/packageStore";
export * from "./store/dashboardStore";
export * from "./store/investmentPlansStore";
