// Customer Portal Module
// This file serves as the entry point for the customer portal

// Layouts
export { default as CustomerLayout } from "./shared/layouts/CustomerLayout";

// Features
export * from "./features/home";

// Shared Components
export * from "./shared/components";
export * from "./shared/partials";

// Utils
export * from "./utils/constants";
export * from "./utils/helpers";

// Legacy exports for backward compatibility
export { default as CustomerHomePage } from "./components/CustomerHomePage";
