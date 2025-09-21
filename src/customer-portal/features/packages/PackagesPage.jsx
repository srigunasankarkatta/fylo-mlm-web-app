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
      id: "starter",
      name: "Starter Package",
      price: "$99",
      period: "one-time",
      icon: <Target className="w-8 h-8" />,
      color: "from-customer-brand-500 to-customer-brand-600",
      bgColor: "bg-customer-brand-50",
      borderColor: "border-customer-brand-200",
      textColor: "text-customer-brand-600",
      description: "Perfect for beginners who want to start their MLM journey",
      features: [
        "3-Level MLM Structure",
        "Basic Dashboard Access",
        "Email Support",
        "Mobile App Access",
        "Basic Analytics",
        "Up to 10 Direct Referrals",
        "Standard Payout Schedule",
        "Basic Training Materials",
      ],
      earnings: {
        direct: "$50",
        level2: "$25",
        level3: "$10",
      },
      popular: false,
    },
    {
      id: "professional",
      name: "Professional Package",
      price: "$299",
      period: "one-time",
      icon: <Star className="w-8 h-8" />,
      color: "from-customer-accent-500 to-customer-accent-600",
      bgColor: "bg-customer-accent-50",
      borderColor: "border-customer-accent-200",
      textColor: "text-customer-accent-600",
      description:
        "Ideal for serious entrepreneurs ready to scale their business",
      features: [
        "3-Level MLM Structure",
        "Advanced Dashboard",
        "Priority Support",
        "Mobile App + Desktop",
        "Advanced Analytics",
        "Up to 50 Direct Referrals",
        "Weekly Payout Schedule",
        "Premium Training Materials",
        "Team Management Tools",
        "Custom Reports",
        "Webinar Access",
        "1-on-1 Coaching Session",
      ],
      earnings: {
        direct: "$150",
        level2: "$75",
        level3: "$30",
      },
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Package",
      price: "$599",
      period: "one-time",
      icon: <Crown className="w-8 h-8" />,
      color: "from-customer-brand-700 to-customer-brand-900",
      bgColor: "bg-gradient-to-br from-customer-brand-50 to-customer-accent-50",
      borderColor: "border-customer-brand-300",
      textColor: "text-customer-brand-700",
      description: "For established leaders who want maximum earning potential",
      features: [
        "3-Level MLM Structure",
        "Premium Dashboard",
        "24/7 VIP Support",
        "All Platform Access",
        "Real-time Analytics",
        "Unlimited Direct Referrals",
        "Daily Payout Schedule",
        "Complete Training Library",
        "Advanced Team Management",
        "Custom Analytics",
        "Exclusive Webinars",
        "Personal Success Manager",
        "Leadership Bonuses",
        "Priority Processing",
        "White-label Options",
      ],
      earnings: {
        direct: "$300",
        level2: "$150",
        level3: "$60",
      },
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

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer border-2 ${
                  selectedPackage === pkg.id
                    ? "border-customer-brand-500 ring-2 ring-customer-brand-200"
                    : "border-customer-ui-border hover:border-customer-brand-300"
                } ${pkg.popular ? "ring-2 ring-customer-accent-200" : ""}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-customer-accent-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`w-16 h-16 ${pkg.bgColor} rounded-xl flex items-center justify-center ${pkg.textColor} mb-6`}
                >
                  {pkg.icon}
                </div>

                <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-2">
                  {pkg.name}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-customer-ui-text-primary">
                    {pkg.price}
                  </span>
                  <span className="text-customer-ui-text-tertiary ml-2">
                    /{pkg.period}
                  </span>
                </div>

                <p className="text-customer-ui-text-secondary mb-6">
                  {pkg.description}
                </p>

                <div className="space-y-3 mb-8">
                  {pkg.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-customer-brand-500 mr-3 flex-shrink-0" />
                      <span className="text-customer-ui-text-secondary text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                  {pkg.features.length > 6 && (
                    <div className="text-customer-brand-500 text-sm font-medium">
                      +{pkg.features.length - 6} more features
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    selectedPackage === pkg.id
                      ? "bg-customer-brand-500 text-white hover:bg-customer-brand-600"
                      : "bg-customer-ui-border text-customer-ui-text-primary hover:bg-customer-brand-100"
                  }`}
                >
                  {selectedPackage === pkg.id ? "Selected" : "Select Package"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Package Details */}
      {selectedPkg && (
        <section className="py-16 bg-customer-ui-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-4">
                {selectedPkg.name} - Complete Details
              </h2>
              <p className="text-lg text-customer-ui-text-secondary">
                Everything included in your selected package
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Features List */}
              <div>
                <h3 className="text-2xl font-semibold text-customer-ui-text-primary mb-6">
                  All Features Included
                </h3>
                <div className="space-y-4">
                  {selectedPkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="w-6 h-6 text-customer-brand-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="text-customer-ui-text-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings Potential */}
              <div>
                <h3 className="text-2xl font-semibold text-customer-ui-text-primary mb-6">
                  Earning Potential
                </h3>
                <div className="bg-gradient-to-br from-customer-brand-50 to-customer-accent-50 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-customer-ui-text-primary">
                          Direct Referrals
                        </div>
                        <div className="text-sm text-customer-ui-text-tertiary">
                          Per successful referral
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-customer-brand-500">
                        {selectedPkg.earnings.direct}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-customer-ui-text-primary">
                          Level 2 Commissions
                        </div>
                        <div className="text-sm text-customer-ui-text-tertiary">
                          From your team's referrals
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-customer-brand-500">
                        {selectedPkg.earnings.level2}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-customer-ui-text-primary">
                          Level 3 Commissions
                        </div>
                        <div className="text-sm text-customer-ui-text-tertiary">
                          From your team's team
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-customer-brand-500">
                        {selectedPkg.earnings.level3}
                      </div>
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
