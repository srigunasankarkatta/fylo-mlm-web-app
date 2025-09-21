import React from "react";
import {
  Users,
  TrendingUp,
  Shield,
  DollarSign,
  BarChart3,
  Clock,
  Smartphone,
  Globe,
  Award,
  Target,
  Zap,
  CheckCircle,
} from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Level Structure",
      description:
        "Build your network with our proven 3-level MLM structure. Each level offers different earning opportunities and growth potential.",
      benefits: [
        "3 Levels Deep",
        "Unlimited Growth",
        "Team Building",
        "Leadership Development",
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Auto Pool System",
      description:
        "Our revolutionary Auto Pool system automatically distributes earnings based on your network performance and activity levels.",
      benefits: [
        "Automatic Payouts",
        "Performance Based",
        "Real-time Updates",
        "Transparent Tracking",
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description:
        "Bank-level security ensures your data and earnings are protected with advanced encryption and secure payment processing.",
      benefits: [
        "256-bit Encryption",
        "Secure Payments",
        "Data Protection",
        "Regular Audits",
      ],
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Multiple Income Streams",
      description:
        "Earn through various channels including direct sales, team commissions, bonuses, and leadership rewards.",
      benefits: [
        "Direct Sales",
        "Team Commissions",
        "Leadership Bonuses",
        "Performance Rewards",
      ],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Analytics",
      description:
        "Track your performance with comprehensive analytics, earnings reports, and team growth metrics in real-time.",
      benefits: [
        "Live Dashboard",
        "Earnings Reports",
        "Team Analytics",
        "Performance Metrics",
      ],
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our round-the-clock customer support team and comprehensive help resources.",
      benefits: [
        "Live Chat",
        "Email Support",
        "Video Tutorials",
        "Knowledge Base",
      ],
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App",
      description:
        "Manage your MLM business on the go with our feature-rich mobile application available on iOS and Android.",
      benefits: [
        "iOS & Android",
        "Push Notifications",
        "Mobile Dashboard",
        "Offline Access",
      ],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description:
        "Build your network worldwide with our international platform supporting multiple currencies and languages.",
      benefits: [
        "Multi-Currency",
        "Multi-Language",
        "Global Network",
        "Local Support",
      ],
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Members" },
    { number: "$2.5M+", label: "Total Payouts" },
    { number: "50+", label: "Countries" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-customer-ui-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-customer-brand-50 to-customer-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-customer-ui-text-primary mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-customer-brand-500 to-customer-accent-500 bg-clip-text text-transparent block">
              Your Success
            </span>
          </h1>
          <p className="text-xl text-customer-ui-text-secondary mb-12 max-w-3xl mx-auto">
            Discover the comprehensive suite of tools and features designed to
            help you build, manage, and grow your MLM business effectively.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-customer-ui-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-customer-brand-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-customer-ui-text-secondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-customer-ui-text-primary mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-customer-ui-text-secondary max-w-2xl mx-auto">
              Our platform provides all the tools and features necessary to
              build a successful MLM business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-customer-brand-100 rounded-xl flex items-center justify-center text-customer-brand-500 mb-6 group-hover:bg-customer-brand-500 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-4">
                  {feature.title}
                </h3>

                <p className="text-customer-ui-text-secondary mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li
                      key={benefitIndex}
                      className="flex items-center text-sm text-customer-ui-text-tertiary"
                    >
                      <CheckCircle className="w-4 h-4 text-customer-brand-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-customer-brand-500 to-customer-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-customer-brand-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs who are already building
            their MLM empire with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-customer-brand-500 rounded-xl font-semibold text-lg hover:bg-customer-brand-50 transition-all duration-300 shadow-soft hover:shadow-medium">
              Start Your Journey
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-customer-brand-500 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
