# Color Palette System Guide

This guide explains how to use the comprehensive color palette system for the Fylo MLM Web App.

## Overview

The color system consists of:
- **Base Colors**: Universal colors used across both portals
- **Authority Portal Colors**: Professional, trustworthy colors for authority users
- **Customer Portal Colors**: Friendly, approachable colors for customer users

## File Structure

```
src/app/
├── colors.js              # Main color definitions
├── color-utils.js         # Utility functions and constants
├── color-variables.css    # CSS custom properties
├── color-examples.jsx     # Usage examples
└── COLOR_GUIDE.md         # This guide
```

## Usage Methods

### 1. Tailwind CSS Classes

Use the custom color classes in your JSX:

```jsx
// Authority portal colors
<div className="bg-authority-brand-500 text-white">
  Authority Brand Primary
</div>

// Customer portal colors
<div className="bg-customer-brand-500 text-white">
  Customer Brand Primary
</div>

// Base colors
<div className="bg-primary-500 text-white">
  Base Primary
</div>
```

### 2. CSS Custom Properties

Use CSS variables in your stylesheets:

```css
.authority-button {
  background-color: var(--color-authority-brand-500);
  color: var(--color-authority-ui-text-inverse);
}

.customer-button {
  background-color: var(--color-customer-brand-500);
  color: var(--color-customer-ui-text-inverse);
}
```

### 3. JavaScript/React Usage

Import and use the color utilities:

```jsx
import { colorUtils, COLORS } from './app/color-utils.js';

// Get specific colors
const brandColor = colorUtils.getAuthorityColor('brand.500');
const statusColor = colorUtils.getStatusColor('active', 'authority');

// Use in inline styles
<div style={{ backgroundColor: COLORS.AUTHORITY.BRAND[500] }}>
  Authority Content
</div>
```

## Color Palettes

### Base Colors
- **Primary**: Blue tones (#0ea5e9)
- **Secondary**: Gray tones (#64748b)
- **Neutral**: Black/white/gray scale
- **Success**: Green tones (#22c55e)
- **Warning**: Yellow/orange tones (#f59e0b)
- **Error**: Red tones (#ef4444)
- **Info**: Blue tones (#3b82f6)

### Authority Portal Colors
- **Brand**: Indigo/purple tones (#6366f1) - Professional, trustworthy
- **Accent**: Purple/pink tones (#d946ef) - Modern, sophisticated
- **Status**: 
  - Active: Green (#22c55e)
  - Pending: Yellow (#f59e0b)
  - Inactive: Gray (#a3a3a3)
  - Suspended: Red (#ef4444)
  - Verified: Blue (#3b82f6)

### Customer Portal Colors
- **Brand**: Teal/cyan tones (#14b8a6) - Friendly, approachable
- **Accent**: Orange tones (#f97316) - Energetic, modern
- **Status**:
  - Active: Green (#22c55e)
  - Pending: Yellow (#f59e0b)
  - Inactive: Gray (#a3a3a3)
  - Premium: Purple (#8b5cf6)
  - New: Blue (#3b82f6)

## Color Shades

Each color comes in 11 shades (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950):
- **50**: Lightest shade
- **500**: Main/brand color
- **950**: Darkest shade

## Best Practices

### 1. Portal-Specific Theming
```jsx
// Set theme attribute on root element
<div data-theme="authority">
  {/* Authority portal content */}
</div>

<div data-theme="customer">
  {/* Customer portal content */}
</div>
```

### 2. Consistent Color Usage
- Use brand colors for primary actions
- Use accent colors for secondary actions
- Use status colors for state indicators
- Use neutral colors for text and borders

### 3. Accessibility
- Ensure sufficient contrast ratios
- Use `colorUtils.getContrastColor()` for text on colored backgrounds
- Test with color blindness simulators

### 4. Responsive Design
- Use lighter shades for mobile backgrounds
- Use darker shades for desktop emphasis
- Maintain consistency across breakpoints

## Examples

### Button Components
```jsx
// Authority Primary Button
<button className="bg-authority-brand-500 hover:bg-authority-brand-600 text-white px-4 py-2 rounded">
  Authority Action
</button>

// Customer Primary Button
<button className="bg-customer-brand-500 hover:bg-customer-brand-600 text-white px-4 py-2 rounded">
  Customer Action
</button>
```

### Status Indicators
```jsx
// Status Badge
<span className={`px-2 py-1 rounded text-sm ${
  status === 'active' ? 'bg-success-100 text-success-800' :
  status === 'pending' ? 'bg-warning-100 text-warning-800' :
  'bg-neutral-100 text-neutral-800'
}`}>
  {status}
</span>
```

### Card Components
```jsx
// Authority Card
<div className="bg-authority-ui-surface border border-authority-ui-border rounded-lg p-6">
  <h3 className="text-authority-ui-text-primary">Authority Card</h3>
  <p className="text-authority-ui-text-secondary">Card content</p>
</div>
```

## Migration Guide

If you have existing colors in your project:

1. **Replace hardcoded colors** with palette references
2. **Update CSS files** to use custom properties
3. **Test accessibility** with new color combinations
4. **Update component libraries** to use new color system

## Tools and Resources

- **Color Picker**: Use browser dev tools to inspect colors
- **Contrast Checker**: Use online tools to verify accessibility
- **Color Blindness Simulator**: Test with various color vision deficiencies
- **Design System**: Maintain consistency with design tokens

## Support

For questions about the color system:
1. Check this guide first
2. Look at `color-examples.jsx` for usage examples
3. Review the color definitions in `colors.js`
4. Use the utility functions in `color-utils.js`
