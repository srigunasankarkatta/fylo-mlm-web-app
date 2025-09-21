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

      {/* Four Powerful Income Streams */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-customer-ui-text-primary mb-4">
              Four Powerful Income Streams
            </h2>
            <p className="text-lg text-customer-ui-text-secondary max-w-3xl mx-auto">
              Our revolutionary compensation system offers multiple ways to
              earn, creating a robust foundation for your financial success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Level Income */}
            <div className="group bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-customer-ui-border hover:border-customer-brand-200">
              <div className="flex items-center justify-center w-16 h-16 bg-customer-brand-100 rounded-xl mb-6 group-hover:bg-customer-brand-200 transition-colors duration-300">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-4">
                Level Income - Direct Upline Rewards
              </h3>
              <p className="text-customer-ui-text-secondary mb-4">
                Every time someone joins your team, your entire upline chain
                gets rewarded instantly.
              </p>
              <ul className="space-y-2 text-customer-ui-text-secondary">
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>
                    0.5 units instantly credited to every person in your upline
                    chain
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>Rewards leadership and team building efforts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>
                    Automatic distribution - no manual tracking needed
                  </span>
                </li>
              </ul>
            </div>

            {/* Fast Track Income */}
            <div className="group bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-customer-ui-border hover:border-customer-brand-200">
              <div className="flex items-center justify-center w-16 h-16 bg-customer-accent-100 rounded-xl mb-6 group-hover:bg-customer-accent-200 transition-colors duration-300">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-4">
                Fast Track Income - Instant Commissions
              </h3>
              <p className="text-customer-ui-text-secondary mb-4">
                Get immediate rewards when your team members purchase packages.
              </p>
              <ul className="space-y-2 text-customer-ui-text-secondary">
                <li className="flex items-start">
                  <span className="text-customer-accent-500 mr-2">•</span>
                  <span>
                    Pre-configured percentage instantly credited to direct
                    upline
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-accent-500 mr-2">•</span>
                  <span>Immediate reward for mentorship and guidance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-accent-500 mr-2">•</span>
                  <span>No waiting periods - commissions paid instantly</span>
                </li>
              </ul>
            </div>

            {/* Club Income */}
            <div className="group bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-customer-ui-border hover:border-customer-brand-200">
              <div className="flex items-center justify-center w-16 h-16 bg-customer-brand-100 rounded-xl mb-6 group-hover:bg-customer-brand-200 transition-colors duration-300">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-4">
                Club Income - Matrix Expansion
              </h3>
              <p className="text-customer-ui-text-secondary mb-4">
                A powerful 10-level team building bonus with exponential growth
                potential.
              </p>
              <ul className="space-y-2 text-customer-ui-text-secondary">
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>
                    Level 1: 4 persons = $4, Level 2: 16 persons = $16
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>Income grows exponentially up to Level 10</span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>Balanced 4x10 matrix ensures fair distribution</span>
                </li>
              </ul>
            </div>

            {/* Auto Pool Income */}
            <div className="group bg-customer-ui-surface rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-customer-ui-border hover:border-customer-brand-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-customer-brand-100 to-customer-accent-100 rounded-xl mb-6 group-hover:from-customer-brand-200 group-hover:to-customer-accent-200 transition-colors duration-300">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-4">
                Auto Pool Income - Company-Funded Pools
              </h3>
              <p className="text-customer-ui-text-secondary mb-4">
                The most powerful feature - funded by company revenue, not
                member fees.
              </p>
              <ul className="space-y-2 text-customer-ui-text-secondary">
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>10 pools (Bronze to NBNB) with 8 sub-levels each</span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>Massive, pre-defined commission percentages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-customer-brand-500 mr-2">•</span>
                  <span>Automatically distributed as users advance levels</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Matrix System Explanation */}
          <div className="bg-gradient-to-r from-customer-brand-50 to-customer-accent-50 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-4 text-center">
              Balanced 4x10 Matrix System
            </h3>
            <p className="text-customer-ui-text-secondary text-center max-w-4xl mx-auto mb-6">
              Our forced 4x10 matrix ensures balanced growth and fair
              distribution. Each user can only have 4 direct referrals, and
              spillover fills the tree evenly, creating a sustainable and
              profitable structure for everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-customer-ui-surface rounded-xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-customer-brand-500 mb-2">
                  4
                </div>
                <div className="text-customer-ui-text-secondary">
                  Max Direct Referrals
                </div>
              </div>
              <div className="bg-customer-ui-surface rounded-xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-customer-accent-500 mb-2">
                  10
                </div>
                <div className="text-customer-ui-text-secondary">
                  Levels Deep
                </div>
              </div>
              <div className="bg-customer-ui-surface rounded-xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-customer-brand-500 mb-2">
                  ∞
                </div>
                <div className="text-customer-ui-text-secondary">
                  Earning Potential
                </div>
              </div>
            </div>
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
