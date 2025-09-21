// Color Utility Functions and Components
// This file provides utilities for working with the color system

import { allColors } from "./colors.js";

// Color utility functions
export const colorUtils = {
  // Get color with opacity
  withOpacity: (color, opacity) => {
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color;
  },

  // Get color from path (e.g., 'authority.brand.500')
  getColor: (path, palette = "base") => {
    const keys = path.split(".");
    let color = allColors[palette];
    for (const key of keys) {
      if (color && color[key]) {
        color = color[key];
      } else {
        console.warn(`Color path not found: ${palette}.${path}`);
        return "#000000"; // Fallback color
      }
    }
    return color;
  },

  // Get authority color
  getAuthorityColor: (path) => colorUtils.getColor(path, "authority"),

  // Get customer color
  getCustomerColor: (path) => colorUtils.getColor(path, "customer"),

  // Get base color
  getBaseColor: (path) => colorUtils.getColor(path, "base"),

  // Generate color variations
  generateVariations: (
    baseColor,
    variations = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
  ) => {
    // This is a simplified version - in a real app, you'd use a color manipulation library
    return variations.reduce((acc, variation) => {
      acc[variation] = baseColor;
      return acc;
    }, {});
  },

  // Get contrast color (black or white) for text on a background
  getContrastColor: (backgroundColor) => {
    // Simple contrast calculation - in production, use a proper color contrast library
    const hex = backgroundColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  },

  // Get status color based on status type
  getStatusColor: (status, portal = "authority") => {
    const statusColors = {
      authority: allColors.authority.status,
      customer: allColors.customer.status,
    };
    return statusColors[portal]?.[status] || allColors.base.neutral[500];
  },

  // Get brand color for portal
  getBrandColor: (portal = "authority", shade = 500) => {
    const brandColors = {
      authority: allColors.authority.brand,
      customer: allColors.customer.brand,
    };
    return brandColors[portal]?.[shade] || allColors.base.primary[shade];
  },
};

// Color constants for easy access
export const COLORS = {
  // Base colors
  PRIMARY: allColors.base.primary,
  SECONDARY: allColors.base.secondary,
  NEUTRAL: allColors.base.neutral,
  SUCCESS: allColors.base.success,
  WARNING: allColors.base.warning,
  ERROR: allColors.base.error,
  INFO: allColors.base.info,

  // Authority colors
  AUTHORITY: {
    BRAND: allColors.authority.brand,
    ACCENT: allColors.authority.accent,
    STATUS: allColors.authority.status,
    UI: allColors.authority.ui,
  },

  // Customer colors
  CUSTOMER: {
    BRAND: allColors.customer.brand,
    ACCENT: allColors.customer.accent,
    STATUS: allColors.customer.status,
    UI: allColors.customer.ui,
  },
};

// Common color combinations for different use cases
export const colorCombinations = {
  // Authority portal combinations
  authority: {
    primary: {
      background: allColors.authority.brand[500],
      text: "#ffffff",
      hover: allColors.authority.brand[600],
    },
    secondary: {
      background: allColors.authority.accent[500],
      text: "#ffffff",
      hover: allColors.authority.accent[600],
    },
    surface: {
      background: allColors.authority.ui.surface,
      text: allColors.authority.ui.text.primary,
      border: allColors.authority.ui.border,
    },
  },

  // Customer portal combinations
  customer: {
    primary: {
      background: allColors.customer.brand[500],
      text: "#ffffff",
      hover: allColors.customer.brand[600],
    },
    secondary: {
      background: allColors.customer.accent[500],
      text: "#ffffff",
      hover: allColors.customer.accent[600],
    },
    surface: {
      background: allColors.customer.ui.surface,
      text: allColors.customer.ui.text.primary,
      border: allColors.customer.ui.border,
    },
  },
};

// Export everything
export default {
  colorUtils,
  COLORS,
  colorCombinations,
  allColors,
};
