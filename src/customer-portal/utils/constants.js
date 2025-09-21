// Customer Portal Constants
export const CUSTOMER_PORTAL_CONFIG = {
  name: "Fylo MLM",
  description: "Empowering individuals worldwide to achieve financial freedom",
  supportEmail: "support@fylomlm.com",
  supportPhone: "+1 (555) 123-4567",
  socialMedia: {
    facebook: "#facebook",
    twitter: "#twitter",
    instagram: "#instagram",
    linkedin: "#linkedin",
  },
};

export const NAVIGATION_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Packages", href: "#packages" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const FOOTER_LINKS = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#team" },
    { name: "Careers", href: "#careers" },
    { name: "Press", href: "#press" },
  ],
  support: [
    { name: "Help Center", href: "#help" },
    { name: "Contact Us", href: "#contact" },
    { name: "Live Chat", href: "#chat" },
    { name: "Tutorials", href: "#tutorials" },
  ],
  legal: [
    { name: "Terms of Service", href: "#terms" },
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "Disclaimer", href: "#disclaimer" },
  ],
  resources: [
    { name: "Blog", href: "#blog" },
    { name: "FAQ", href: "#faq" },
    { name: "Documentation", href: "#docs" },
    { name: "API", href: "#api" },
  ],
};

export const PACKAGE_TIERS = [
  {
    name: "Bronze",
    price: "$100",
    level: "Level 1",
    color: "customer-accent",
    icon: "Star",
    features: [
      "Basic Auto Pool Access",
      "Level 1 Rewards",
      "Community Support",
    ],
  },
  {
    name: "Silver",
    price: "$500",
    level: "Level 3",
    color: "customer-brand",
    icon: "Crown",
    features: ["Enhanced Auto Pool", "Level 3 Rewards", "Priority Support"],
    popular: true,
  },
  {
    name: "Gold",
    price: "$1000",
    level: "Level 5",
    color: "customer-accent",
    icon: "Zap",
    features: ["Premium Auto Pool", "Level 5 Rewards", "VIP Support"],
  },
];

export const TRUST_FEATURES = [
  {
    icon: "Shield",
    title: "Bank-Level Security",
    description: "256-bit SSL encryption protects your data",
  },
  {
    icon: "CheckCircle",
    title: "Regulated Platform",
    description: "Fully compliant with international standards",
  },
  {
    icon: "Globe",
    title: "Global Reach",
    description: "Available in 50+ countries worldwide",
  },
  {
    icon: "Users",
    title: "24/7 Support",
    description: "Round-the-clock customer assistance",
  },
];

export const PAYMENT_METHODS = [
  { name: "Visa", icon: "💳" },
  { name: "Mastercard", icon: "💳" },
  { name: "PayPal", icon: "💰" },
  { name: "Bitcoin", icon: "₿" },
  { name: "Ethereum", icon: "Ξ" },
];
