import React from "react";
import { CreditCard, Shield, Globe, Users, CheckCircle } from "lucide-react";

const TrustSection = () => {
  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "PayPal", icon: "💰" },
    { name: "Bitcoin", icon: "₿" },
    { name: "Ethereum", icon: "Ξ" },
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption protects your data",
    },
    {
      icon: CheckCircle,
      title: "Regulated Platform",
      description: "Fully compliant with international standards",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Available in 50+ countries worldwide",
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
    },
  ];

  return (
    <section className="py-20 bg-customer-ui-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-customer-ui-text-primary mb-6">
            Trusted by{" "}
            <span className="text-customer-brand-500">Thousands</span> Worldwide
          </h2>
          <p className="text-xl text-customer-ui-text-secondary max-w-3xl mx-auto">
            Join thousands of satisfied members who have transformed their
            financial future with our proven system.
          </p>
        </div>

        {/* Trust Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-customer-brand-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-customer-brand-500 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-customer-brand-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-customer-ui-text-secondary text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Payment Methods */}
        <div className="bg-customer-brand-50/30 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-4">
              Secure Payment Methods
            </h3>
            <p className="text-customer-ui-text-secondary">
              Choose from multiple secure payment options
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-customer-ui-surface px-6 py-3 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="font-semibold text-customer-ui-text-primary group-hover:text-customer-brand-500 transition-colors duration-300">
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-customer-brand-500 mb-2">
              10,000+
            </div>
            <div className="text-customer-ui-text-secondary">
              Active Members
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-customer-accent-500 mb-2">
              $2M+
            </div>
            <div className="text-customer-ui-text-secondary">Total Payouts</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-customer-brand-500 mb-2">
              50+
            </div>
            <div className="text-customer-ui-text-secondary">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-customer-accent-500 mb-2">
              4.9/5
            </div>
            <div className="text-customer-ui-text-secondary">Member Rating</div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-medium text-customer-ui-text-primary mb-6 italic">
              "Fylo MLM has completely transformed my financial situation. The
              Auto Pool system is incredibly powerful and the support team is
              amazing."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-customer-brand-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">SJ</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-customer-ui-text-primary">
                  Sarah Johnson
                </div>
                <div className="text-customer-ui-text-secondary">
                  Gold Member, USA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
