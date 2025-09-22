import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Star,
  Crown,
  Zap,
  ArrowRight,
  Users,
  DollarSign,
  Target,
  Award,
  Shield,
  ShoppingCart,
  BarChart3,
  Package,
  TrendingUp,
} from "lucide-react";
import { usePackageStore } from "../../store/packageStore";

const PackagesPage = () => {
  const { packages, isLoading, error, fetchPackages } = usePackageStore();
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Mock packages for display (will be replaced with API data)
  const mockPackages = [
    {
      id: "bronze",
      name: "Bronze",
      price: "$99",
      level: 1,
      icon: "🥉",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-600",
      description: "Perfect entry point for new members",
      benefits: [
        "Unlocks Level 1 Income Potential",
        "Grants entry into the Level 1 Bronze Auto Pool",
        "Basic Dashboard Access",
        "Email Support",
        "Mobile App Access",
      ],
      popular: false,
    },
    {
      id: "silver",
      name: "Silver",
      price: "$199",
      level: 2,
      icon: "🥈",
      color: "from-gray-400 to-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      textColor: "text-gray-600",
      description: "Enhanced earning potential and features",
      benefits: [
        "Unlocks Level 2 Income Potential",
        "Grants entry into the Level 2 Silver Auto Pool",
        "Advanced Dashboard Access",
        "Priority Support",
        "Team Management Tools",
        "Weekly Training Sessions",
      ],
      popular: true,
    },
    {
      id: "gold",
      name: "Gold",
      price: "$399",
      level: 3,
      icon: "🥇",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-600",
      description: "Premium package for serious entrepreneurs",
      benefits: [
        "Unlocks Level 3 Income Potential",
        "Grants entry into the Level 3 Gold Auto Pool",
        "Full Dashboard Access",
        "24/7 Priority Support",
        "Advanced Analytics",
        "Personal Mentor Assignment",
        "Exclusive Webinars",
      ],
      popular: false,
    },
    {
      id: "platinum",
      name: "Platinum",
      price: "$799",
      level: 4,
      icon: "💎",
      color: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      description: "Elite package for top performers",
      benefits: [
        "Unlocks Level 4 Income Potential",
        "Grants entry into the Level 4 Platinum Auto Pool",
        "Executive Dashboard Access",
        "Dedicated Account Manager",
        "Custom Analytics Reports",
        "1-on-1 Coaching Sessions",
        "VIP Event Access",
        "White-label Solutions",
      ],
      popular: false,
    },
    {
      id: "avax",
      name: "AVAX",
      price: "$299",
      level: 5,
      icon: "🔷",
      color: "from-red-400 to-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-600",
      description: "Crypto-focused earning package",
      benefits: [
        "Unlocks Level 5 Income Potential",
        "Grants entry into the Level 5 AVAX Auto Pool",
        "Crypto Dashboard Access",
        "Trading Tools & Signals",
        "Blockchain Analytics",
        "DeFi Integration",
        "Crypto Rewards Program",
      ],
      popular: false,
    },
    {
      id: "doge",
      name: "DOGE",
      price: "$149",
      level: 6,
      icon: "🐕",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-600",
      description: "Fun and accessible crypto package",
      benefits: [
        "Unlocks Level 6 Income Potential",
        "Grants entry into the Level 6 DOGE Auto Pool",
        "Meme Coin Dashboard",
        "Community Access",
        "Social Trading Features",
        "Fun Rewards System",
      ],
      popular: false,
    },
    {
      id: "xrp",
      name: "XRP Ripple",
      price: "$249",
      level: 7,
      icon: "💧",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      description: "Ripple network integration package",
      benefits: [
        "Unlocks Level 7 Income Potential",
        "Grants entry into the Level 7 XRP Auto Pool",
        "Ripple Network Access",
        "Cross-border Payment Tools",
        "Banking Integration",
        "Institutional Features",
      ],
      popular: false,
    },
    {
      id: "solana",
      name: "Solana",
      price: "$349",
      level: 8,
      icon: "☀️",
      color: "from-purple-400 to-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-600",
      description: "High-performance blockchain package",
      benefits: [
        "Unlocks Level 8 Income Potential",
        "Grants entry into the Level 8 Solana Auto Pool",
        "Solana Ecosystem Access",
        "NFT Marketplace Tools",
        "DeFi Protocols",
        "High-Speed Trading",
      ],
      popular: false,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      price: "$499",
      level: 9,
      icon: "⟠",
      color: "from-indigo-400 to-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-600",
      description: "Smart contract and DeFi package",
      benefits: [
        "Unlocks Level 9 Income Potential",
        "Grants entry into the Level 9 Ethereum Auto Pool",
        "Ethereum Ecosystem Access",
        "Smart Contract Tools",
        "DeFi Protocol Integration",
        "NFT Creation Tools",
        "Staking Rewards",
      ],
      popular: false,
    },
    {
      id: "bnb",
      name: "BNB",
      price: "$199",
      level: 10,
      icon: "🟡",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-600",
      description: "Binance ecosystem package",
      benefits: [
        "Unlocks Level 10 Income Potential",
        "Grants entry into the Level 10 BNB Auto Pool",
        "Binance Ecosystem Access",
        "Trading Bot Integration",
        "Futures Trading Tools",
        "Launchpad Access",
        "VIP Trading Benefits",
      ],
      popular: false,
    },
  ];

  const displayPackages =
    packages.length > 0
      ? packages.map((pkg) => ({
          id: pkg.code.toLowerCase(),
          name: pkg.name,
          price: `$${parseFloat(pkg.price).toLocaleString()}`,
          level: pkg.level_number,
          icon: "📦",
          color: "from-customer-brand-500 to-customer-accent-500",
          bgColor: "bg-customer-brand-50",
          borderColor: "border-customer-brand-200",
          textColor: "text-customer-brand-600",
          description: pkg.description || "Premium MLM package",
          benefits: [
            `Unlocks Level ${pkg.level_number} Income Potential`,
            `Grants entry into the Level ${pkg.level_number} ${pkg.name} Auto Pool`,
            "Full Dashboard Access",
            "Priority Support",
            "Advanced Analytics",
          ],
          popular: false,
        }))
      : mockPackages;

  return (
    <div className="min-h-screen bg-customer-ui-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-customer-brand-50 to-customer-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-customer-ui-text-primary mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-customer-brand-500 to-customer-accent-500 bg-clip-text text-transparent">
                {" "}
                Package
              </span>
            </h1>
            <p className="text-xl text-customer-ui-text-secondary mb-8 max-w-3xl mx-auto">
              Your package level determines your earning potential across all
              income streams, especially the company Auto Pool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/packages/manage"
                className="inline-flex items-center px-8 py-4 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-soft hover:shadow-medium"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Manage Packages
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 border-2 border-customer-brand-500 text-customer-brand-500 hover:bg-customer-brand-50 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-yellow-50 border-l-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-yellow-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Important Notice
              </h3>
              <p className="text-yellow-700">
                Your package level determines your earning potential across all
                income streams, especially the company Auto Pool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-4">
              Available Packages
            </h2>
            <p className="text-lg text-customer-ui-text-secondary">
              Select the package that best fits your goals and budget
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="ml-3 text-customer-ui-text-primary">
                Loading packages...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border-2 ${
                    pkg.popular
                      ? "border-customer-brand-500 ring-2 ring-customer-brand-200"
                      : "border-customer-ui-border hover:border-customer-brand-300"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-customer-brand-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 ${pkg.bgColor} rounded-2xl flex items-center justify-center text-3xl`}
                    >
                      {pkg.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-customer-ui-text-secondary mb-4">
                      {pkg.description}
                    </p>
                    <div className="text-4xl font-bold text-customer-ui-text-primary mb-2">
                      {pkg.price}
                    </div>
                    <p className="text-sm text-customer-ui-text-tertiary">
                      Level {pkg.level} Package
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {pkg.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-customer-ui-text-secondary">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Link
                      to="/packages/manage"
                      className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        pkg.popular
                          ? "bg-customer-brand-500 hover:bg-customer-brand-600 text-white shadow-soft hover:shadow-medium"
                          : "border-2 border-customer-brand-500 text-customer-brand-500 hover:bg-customer-brand-50"
                      }`}
                    >
                      Select Package
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-customer-ui-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-4">
              Why Choose Our Packages?
            </h2>
            <p className="text-lg text-customer-ui-text-secondary">
              Each package unlocks unique earning opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-customer-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-customer-brand-500" />
              </div>
              <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-2">
                Multiple Income Streams
              </h3>
              <p className="text-customer-ui-text-secondary">
                Access to Level Income, Fast Track, Club Income, and Auto Pool
                earnings
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-customer-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-customer-accent-500" />
              </div>
              <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-2">
                Secure & Transparent
              </h3>
              <p className="text-customer-ui-text-secondary">
                All transactions are secure with full transparency in earnings
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-2">
                Team Building
              </h3>
              <p className="text-customer-ui-text-secondary">
                Build and manage your team with advanced tools and analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-customer-brand-500 to-customer-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your MLM Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Choose your package today and unlock unlimited earning potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages/manage"
              className="inline-flex items-center px-8 py-4 bg-white text-customer-brand-500 rounded-xl font-semibold text-lg transition-all duration-200 shadow-soft hover:shadow-medium"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Browse Packages
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-customer-brand-500 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
