import React from "react";
import { ArrowRight, Star, Crown, Zap } from "lucide-react";

const PackageTeaserSection = () => {
  const packages = [
    {
      name: "Bronze",
      price: "$100",
      level: "Level 1",
      color: "customer-accent",
      icon: Star,
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
      icon: Crown,
      features: ["Enhanced Auto Pool", "Level 3 Rewards", "Priority Support"],
      popular: true,
    },
    {
      name: "Gold",
      price: "$1000",
      level: "Level 5",
      color: "customer-accent",
      icon: Zap,
      features: ["Premium Auto Pool", "Level 5 Rewards", "VIP Support"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-customer-brand-50/30 to-customer-ui-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-customer-ui-text-primary mb-6">
            Your Journey{" "}
            <span className="text-customer-brand-500">Starts Here</span>
          </h2>
          <p className="text-xl text-customer-ui-text-secondary max-w-3xl mx-auto mb-8">
            Upgrade your package to unlock higher levels in the Auto Pool and
            dramatically increase your earning ceiling.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <div
                key={index}
                className={`relative bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                  pkg.popular
                    ? "border-customer-brand-500 ring-2 ring-customer-brand-100"
                    : "border-customer-ui-border hover:border-customer-brand-200"
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-customer-brand-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${pkg.color}-500 to-${pkg.color}-600 rounded-xl flex items-center justify-center mb-6 mx-auto`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Package Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl font-bold text-customer-brand-500 mb-2">
                    {pkg.price}
                  </div>
                  <div className="text-customer-ui-text-secondary">
                    {pkg.level}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-customer-ui-text-secondary"
                    >
                      <div
                        className={`w-2 h-2 bg-${pkg.color}-500 rounded-full mr-3`}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    pkg.popular
                      ? "bg-customer-brand-500 hover:bg-customer-brand-600 text-white shadow-soft hover:shadow-medium"
                      : `border-2 border-${pkg.color}-500 text-${pkg.color}-500 hover:bg-${pkg.color}-500 hover:text-white`
                  }`}
                >
                  Choose {pkg.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <button className="group inline-flex items-center px-8 py-4 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-soft hover:shadow-medium transform hover:-translate-y-1">
            View All Packages
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageTeaserSection;
