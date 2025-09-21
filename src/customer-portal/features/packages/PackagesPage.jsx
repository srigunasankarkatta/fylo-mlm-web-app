import React, { useState } from "react";
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
} from "lucide-react";

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState("starter");

  const packages = [
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
        "Advanced Dashboard",
        "Priority Support",
        "Enhanced Analytics",
      ],
      popular: false,
    },
    {
      id: "gold",
      name: "Gold",
      price: "$399",
      level: 3,
      icon: "🥇",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-600",
      description: "Premium package with significant advantages",
      benefits: [
        "Unlocks Level 3 Income Potential",
        "Grants entry into the Level 3 Gold Auto Pool",
        "Premium Dashboard",
        "24/7 Support",
        "Advanced Team Management",
      ],
      popular: true,
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
      description: "Elite level with maximum benefits",
      benefits: [
        "Unlocks Level 4 Income Potential",
        "Grants entry into the Level 4 Platinum Auto Pool",
        "VIP Dashboard",
        "Personal Success Manager",
        "Exclusive Training Materials",
      ],
      popular: false,
    },
    {
      id: "avax",
      name: "Avax",
      price: "$1,299",
      level: 5,
      icon: "🔷",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-600",
      description: "Crypto-focused package with high rewards",
      benefits: [
        "Unlocks Level 5 Income Potential",
        "Grants entry into the Level 5 Avax Auto Pool",
        "Crypto Payment Options",
        "Advanced Analytics",
        "Priority Processing",
      ],
      popular: false,
    },
    {
      id: "doge",
      name: "Doge",
      price: "$1,999",
      level: 6,
      icon: "🐕",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-600",
      description: "Fun and profitable Dogecoin package",
      benefits: [
        "Unlocks Level 6 Income Potential",
        "Grants entry into the Level 6 Doge Auto Pool",
        "Doge Payment Integration",
        "Community Access",
        "Special Bonuses",
      ],
      popular: false,
    },
    {
      id: "xrp",
      name: "XRP Ripple",
      price: "$2,999",
      level: 7,
      icon: "💙",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
      description: "Ripple network integration package",
      benefits: [
        "Unlocks Level 7 Income Potential",
        "Grants entry into the Level 7 XRP Auto Pool",
        "XRP Payment System",
        "Fast Transaction Processing",
        "Global Network Access",
      ],
      popular: false,
    },
    {
      id: "solana",
      name: "Solana",
      price: "$4,999",
      level: 8,
      icon: "☀️",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-600",
      description: "High-performance Solana blockchain package",
      benefits: [
        "Unlocks Level 8 Income Potential",
        "Grants entry into the Level 8 Solana Auto Pool",
        "Solana Blockchain Integration",
        "Ultra-Fast Transactions",
        "Advanced DeFi Features",
      ],
      popular: false,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      price: "$7,999",
      level: 9,
      icon: "🔷",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-600",
      description: "Ethereum ecosystem integration package",
      benefits: [
        "Unlocks Level 9 Income Potential",
        "Grants entry into the Level 9 Ethereum Auto Pool",
        "Ethereum Smart Contracts",
        "DeFi Integration",
        "NFT Marketplace Access",
      ],
      popular: false,
    },
    {
      id: "nbnb",
      name: "NBNB",
      price: "$12,999",
      level: 10,
      icon: "💎",
      color: "from-gradient-to-r from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-yellow-300",
      textColor: "text-orange-600",
      description: "Ultimate package with maximum earning potential",
      benefits: [
        "Unlocks Level 10 Income Potential",
        "Grants entry into the Level 10 NBNB Auto Pool",
        "All Platform Features",
        "VIP Treatment",
        "Maximum Commission Rates",
        "Exclusive Events",
        "White-label Options",
      ],
      popular: false,
    },
  ];

  const comparisonFeatures = [
    "3-Level MLM Structure",
    "Dashboard Access",
    "Mobile App",
    "Analytics",
    "Support",
    "Training Materials",
    "Payout Schedule",
    "Team Management",
    "Custom Reports",
    "Coaching",
  ];

  const selectedPkg = packages.find((pkg) => pkg.id === selectedPackage);

  return (
    <div className="min-h-screen bg-customer-ui-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-customer-brand-50 to-customer-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-customer-ui-text-primary mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-customer-brand-500 to-customer-accent-500 bg-clip-text text-transparent block">
              Success Package
            </span>
          </h1>
          <p className="text-xl text-customer-ui-text-secondary mb-12 max-w-3xl mx-auto">
            Select the perfect package that matches your goals and start
            building your MLM empire today.
          </p>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-4">
              Select Your Package
            </h2>
            <p className="text-lg text-customer-ui-text-secondary">
              All packages include our core MLM features with different levels
              of support and earning potential.
            </p>
          </div>

          {/* Package Comparison Table */}
          <div className="bg-customer-ui-surface rounded-2xl shadow-soft overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-customer-brand-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-customer-ui-text-primary">
                      Package Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-customer-ui-text-primary">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-customer-ui-text-primary">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-customer-ui-text-primary">
                      Key Benefits
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-customer-ui-text-primary">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-customer-ui-border">
                  {packages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className={`hover:bg-customer-brand-50 transition-colors duration-200 ${
                        selectedPackage === pkg.id ? "bg-customer-brand-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{pkg.icon}</span>
                          <div>
                            <div className="font-semibold text-customer-ui-text-primary">
                              {pkg.name}
                            </div>
                            <div className="text-sm text-customer-ui-text-tertiary">
                              {pkg.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-2xl font-bold text-customer-brand-500">
                          {pkg.price}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-semibold text-customer-ui-text-primary">
                          Level {pkg.level}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm text-customer-ui-text-secondary">
                            • Unlocks Level {pkg.level} Income Potential
                          </div>
                          <div className="text-sm text-customer-ui-text-secondary">
                            • Grants entry into Level {pkg.level} {pkg.name}{" "}
                            Auto Pool
                          </div>
                          <div className="text-sm text-customer-ui-text-secondary">
                            • {pkg.benefits[2]}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                            selectedPackage === pkg.id
                              ? "bg-customer-brand-500 text-white"
                              : "bg-customer-brand-100 text-customer-brand-600 hover:bg-customer-brand-200"
                          }`}
                        >
                          {selectedPackage === pkg.id
                            ? "Selected"
                            : "Select Package"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="bg-gradient-to-r from-customer-brand-50 to-customer-accent-50 rounded-2xl p-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Shield className="w-6 h-6 text-customer-brand-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                  Important Notice
                </h3>
                <p className="text-customer-ui-text-secondary">
                  <strong>
                    Your package level determines your earning potential across
                    all income streams, especially the company Auto Pool.
                  </strong>
                  Higher packages unlock access to more lucrative Auto Pool
                  levels with greater commission percentages and earning
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Package Details */}
      {selectedPkg && (
        <section className="py-16 bg-customer-ui-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-4">
                {selectedPkg.name} Package - Complete Details
              </h2>
              <p className="text-lg text-customer-ui-text-secondary">
                Everything included in your selected package
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Benefits List */}
              <div>
                <h3 className="text-2xl font-semibold text-customer-ui-text-primary mb-6">
                  All Benefits Included
                </h3>
                <div className="space-y-4">
                  {selectedPkg.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-6 h-6 text-customer-brand-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="text-customer-ui-text-secondary">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto Pool Access Details */}
              <div>
                <h3 className="text-2xl font-semibold text-customer-ui-text-primary mb-6">
                  Auto Pool Access
                </h3>
                <div className="bg-gradient-to-br from-customer-brand-50 to-customer-accent-50 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">{selectedPkg.icon}</div>
                    <h4 className="text-xl font-bold text-customer-ui-text-primary">
                      Level {selectedPkg.level} {selectedPkg.name} Auto Pool
                    </h4>
                    <p className="text-customer-ui-text-secondary">
                      Access to {selectedPkg.name} level Auto Pool with 8
                      sub-levels
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-customer-ui-text-primary mb-2">
                        Auto Pool Benefits
                      </div>
                      <ul className="text-sm text-customer-ui-text-secondary space-y-1">
                        <li>
                          • Company-funded commissions (not from member fees)
                        </li>
                        <li>
                          • 8 sub-levels with massive commission percentages
                        </li>
                        <li>• Automatic distribution as users advance</li>
                        <li>• Higher levels = higher commission rates</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-customer-ui-text-primary mb-2">
                        Income Streams Unlocked
                      </div>
                      <ul className="text-sm text-customer-ui-text-secondary space-y-1">
                        <li>• Level Income: 0.5 units per upline chain</li>
                        <li>• Fast Track: Instant commissions on purchases</li>
                        <li>• Club Income: 10-level matrix expansion</li>
                        <li>
                          • Auto Pool: Level {selectedPkg.level} pool access
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-customer-brand-500 to-customer-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-customer-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs and start building your
            MLM empire today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-customer-brand-500 rounded-xl font-semibold text-lg hover:bg-customer-brand-50 transition-all duration-300 shadow-soft hover:shadow-medium flex items-center justify-center">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-customer-brand-500 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagesPage;
