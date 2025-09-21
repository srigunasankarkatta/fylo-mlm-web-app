import React from "react";
import { Layers, TrendingUp, Shield, Users } from "lucide-react";

const HighlightsSection = () => {
  const highlights = [
    {
      icon: Layers,
      title: "10 Levels of Growth",
      description:
        "Progress from Bronze to NBNB, each unlocking a new Auto Pool with higher rewards.",
      color: "customer-brand",
      gradient: "from-customer-brand-500 to-customer-brand-600",
    },
    {
      icon: TrendingUp,
      title: "8 Sub-Level Payouts",
      description:
        "Earn commissions from thousands of members across 8 defined sub-levels in your pool.",
      color: "customer-accent",
      gradient: "from-customer-accent-500 to-customer-accent-600",
    },
    {
      icon: Shield,
      title: "Built on Transparency",
      description:
        "All transactions and pool distributions are clearly recorded and accessible in your secure dashboard.",
      color: "customer-brand",
      gradient: "from-customer-brand-500 to-customer-brand-600",
    },
    {
      icon: Users,
      title: "Global Community",
      description:
        "Join thousands of members worldwide building wealth through our proven system.",
      color: "customer-accent",
      gradient: "from-customer-accent-500 to-customer-accent-600",
    },
  ];

  return (
    <section className="py-20 bg-customer-ui-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-customer-ui-text-primary mb-6">
            Why Choose <span className="text-customer-brand-500">Fylo MLM</span>
            ?
          </h2>
          <p className="text-xl text-customer-ui-text-secondary max-w-3xl mx-auto">
            Discover the features that make our platform the most effective way
            to build your financial future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={index}
                className="group relative bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-2 border border-customer-ui-border hover:border-customer-brand-200"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 bg-gradient-to-br ${highlight.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-customer-ui-text-primary mb-4 group-hover:text-customer-brand-500 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-customer-ui-text-secondary leading-relaxed">
                    {highlight.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${highlight.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-customer-brand-500 mb-2">
              10K+
            </div>
            <div className="text-customer-ui-text-secondary">
              Active Members
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-customer-accent-500 mb-2">
              $2M+
            </div>
            <div className="text-customer-ui-text-secondary">Paid Out</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-customer-brand-500 mb-2">
              50+
            </div>
            <div className="text-customer-ui-text-secondary">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-customer-accent-500 mb-2">
              99.9%
            </div>
            <div className="text-customer-ui-text-secondary">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
