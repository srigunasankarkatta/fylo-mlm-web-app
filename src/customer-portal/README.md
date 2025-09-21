# Customer Portal Structure

This document outlines the organized structure of the customer portal with proper naming conventions and separation of concerns.

## 📁 Folder Structure

```
src/customer-portal/
├── features/                    # Feature-specific components
│   └── home/                   # Home page feature
│       ├── HomePage.jsx        # Main home page component
│       ├── HeroSection.jsx     # Hero section
│       ├── AutoPoolSection.jsx # Auto Pool introduction
│       ├── HighlightsSection.jsx # Key highlights
│       ├── PackageTeaserSection.jsx # Package showcase
│       ├── TrustSection.jsx    # Trust indicators
│       └── FinalCTASection.jsx # Final call-to-action
├── shared/                     # Shared components and layouts
│   ├── layouts/               # Layout components
│   │   └── CustomerLayout.jsx # Main customer portal layout
│   ├── partials/              # Reusable partial components
│   │   ├── CustomerHeader.jsx # Header component
│   │   └── CustomerFooter.jsx # Footer component
│   └── components/            # Shared UI components
│       ├── Button.jsx         # Reusable button component
│       └── Card.jsx           # Reusable card component
├── utils/                     # Utility functions and constants
│   ├── constants.js           # Application constants
│   └── helpers.js             # Helper functions
└── index.js                   # Main export file
```

## 🎯 Naming Conventions

### Components
- **Layouts**: `CustomerLayout.jsx` - Main layout components
- **Partials**: `CustomerHeader.jsx`, `CustomerFooter.jsx` - Reusable partial components
- **Features**: `HomePage.jsx` - Feature-specific pages
- **Sections**: `HeroSection.jsx` - Page sections within features
- **Shared**: `Button.jsx`, `Card.jsx` - Reusable UI components

### Folders
- **features/**: Feature-specific components organized by domain
- **shared/**: Components shared across features
- **utils/**: Utility functions and constants
- **layouts/**: Layout components
- **partials/**: Reusable partial components
- **components/**: Shared UI components

## 🚀 Usage Examples

### Using the Layout
```jsx
import { CustomerLayout, HomePage } from './customer-portal';

function App() {
  return (
    <CustomerLayout>
      <HomePage />
    </CustomerLayout>
  );
}
```

### Using Shared Components
```jsx
import { Button, Card } from './customer-portal';

function MyComponent() {
  return (
    <Card hover>
      <Card.Body>
        <Button variant="primary" size="lg">
          Click Me
        </Button>
      </Card.Body>
    </Card>
  );
}
```

### Using Utils
```jsx
import { formatCurrency, debounce } from './customer-portal';

const price = formatCurrency(1000); // $1,000.00
const debouncedSearch = debounce(searchFunction, 300);
```

## 📋 Benefits

1. **Clear Separation**: Features are separated from shared components
2. **Reusability**: Shared components can be used across features
3. **Maintainability**: Easy to find and update specific components
4. **Scalability**: Easy to add new features and components
5. **Consistency**: Standardized naming conventions
6. **Organization**: Logical folder structure for better navigation

## 🔄 Adding New Features

1. Create a new folder in `features/` (e.g., `dashboard/`)
2. Add feature-specific components
3. Export from the main `index.js` file
4. Use the `CustomerLayout` for consistent styling

## 🔧 Adding New Shared Components

1. Add component to `shared/components/`
2. Follow naming conventions
3. Export from `shared/components/index.js`
4. Update main `index.js` exports
