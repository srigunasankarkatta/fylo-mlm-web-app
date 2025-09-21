// Base Color Palette System
// This file contains all color definitions for the application

// Base Color Palette - Foundation colors used across both portals
export const baseColors = {
  // Primary Colors
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Main primary
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },

  // Secondary Colors
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b", // Main secondary
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },

  // Neutral Colors
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373", // Main neutral
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },

  // Success Colors
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // Main success
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },

  // Warning Colors
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // Main warning
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },

  // Error Colors
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Main error
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },

  // Info Colors
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main info
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
};

// Authority Portal Color Palette
export const authorityColors = {
  // Authority Brand Colors - Professional, trustworthy, authoritative
  brand: {
    50: "#f0f4ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1", // Main authority brand
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },

  // Authority Accent Colors
  accent: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef", // Main authority accent
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },

  // Authority Status Colors
  status: {
    active: baseColors.success[500],
    pending: baseColors.warning[500],
    inactive: baseColors.neutral[400],
    suspended: baseColors.error[500],
    verified: baseColors.info[500],
  },

  // Authority UI Colors
  ui: {
    background: baseColors.neutral[50],
    surface: "#ffffff",
    surfaceElevated: "#ffffff",
    border: baseColors.neutral[200],
    borderHover: baseColors.neutral[300],
    text: {
      primary: baseColors.neutral[900],
      secondary: baseColors.neutral[600],
      tertiary: baseColors.neutral[500],
      inverse: "#ffffff",
    },
  },
};

// Customer Portal Color Palette - Blue Theme
export const customerColors = {
  // Customer Brand Colors - Professional, trustworthy, modern blue
  brand: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main customer brand
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },

  // Customer Accent Colors - Sky blue accent
  accent: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Main customer accent
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },

  // Customer Status Colors
  status: {
    active: baseColors.success[500],
    pending: baseColors.warning[500],
    inactive: baseColors.neutral[400],
    premium: "#8b5cf6", // Purple for premium status
    new: baseColors.info[500],
  },

  // Customer UI Colors
  ui: {
    background: "#fefefe",
    surface: "#ffffff",
    surfaceElevated: "#ffffff",
    border: baseColors.neutral[200],
    borderHover: baseColors.neutral[300],
    text: {
      primary: baseColors.neutral[900],
      secondary: baseColors.neutral[600],
      tertiary: baseColors.neutral[500],
      inverse: "#ffffff",
    },
  },
};

// Color utility functions
export const colorUtils = {
  // Get color with opacity
  withOpacity: (color, opacity) =>
    `${color}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`,

  // Get portal-specific colors
  getAuthorityColor: (colorPath) => {
    const keys = colorPath.split(".");
    let color = authorityColors;
    for (const key of keys) {
      color = color[key];
    }
    return color;
  },

  getCustomerColor: (colorPath) => {
    const keys = colorPath.split(".");
    let color = customerColors;
    for (const key of keys) {
      color = color[key];
    }
    return color;
  },

  // Get base color
  getBaseColor: (colorPath) => {
    const keys = colorPath.split(".");
    let color = baseColors;
    for (const key of keys) {
      color = color[key];
    }
    return color;
  },
};

// Export all colors for easy access
export const allColors = {
  base: baseColors,
  authority: authorityColors,
  customer: customerColors,
  utils: colorUtils,
};

export default allColors;
