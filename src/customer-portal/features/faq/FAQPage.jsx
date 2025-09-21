import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Search,
  Filter,
} from "lucide-react";

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Questions", count: 0 },
    { id: "general", name: "General", count: 0 },
    { id: "earnings", name: "Earnings", count: 0 },
    { id: "technical", name: "Technical", count: 0 },
    { id: "billing", name: "Billing", count: 0 },
    { id: "support", name: "Support", count: 0 },
  ];

  const faqs = [
    {
      id: 1,
      category: "general",
      question: "What is Fylo MLM and how does it work?",
      answer:
        "Fylo MLM is a multi-level marketing platform that helps you build and manage your network marketing business. Our 3-level structure allows you to earn through direct referrals and team commissions. You can earn money by referring others to join the platform and by building a team of active members.",
    },
    {
      id: 2,
      category: "earnings",
      question: "How much can I earn with Fylo MLM?",
      answer:
        "Your earning potential depends on your package and activity level. With our Starter package, you can earn up to $50 per direct referral, $25 from level 2, and $10 from level 3. Professional and Enterprise packages offer higher earning rates. Many of our top earners make thousands of dollars monthly through their network.",
    },
    {
      id: 3,
      category: "technical",
      question: "Do I need any technical skills to use the platform?",
      answer:
        "No technical skills are required! Our platform is designed to be user-friendly for everyone. We provide comprehensive training materials, video tutorials, and 24/7 support to help you get started. The dashboard is intuitive and guides you through each step of building your MLM business.",
    },
    {
      id: 4,
      category: "billing",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency (Bitcoin, Ethereum). All payments are processed securely through our encrypted payment gateway. You can also set up automatic payments for convenience.",
    },
    {
      id: 5,
      category: "earnings",
      question: "How often are payouts processed?",
      answer:
        "Payout frequency depends on your package: Starter package pays monthly, Professional package pays weekly, and Enterprise package pays daily. All payouts are processed automatically to your registered payment method. You can track your earnings in real-time through your dashboard.",
    },
    {
      id: 6,
      category: "general",
      question: "Is Fylo MLM legitimate and legal?",
      answer:
        "Yes, Fylo MLM is a completely legitimate and legal business opportunity. We operate in compliance with all applicable laws and regulations. Our business model is transparent, and we provide clear information about earnings potential and requirements. We're registered and licensed in all jurisdictions where we operate.",
    },
    {
      id: 7,
      category: "technical",
      question: "Is there a mobile app available?",
      answer:
        "Yes! We have mobile apps available for both iOS and Android devices. The app includes all the features of the web platform, including dashboard access, team management, earnings tracking, and communication tools. You can download it from the App Store or Google Play Store.",
    },
    {
      id: 8,
      category: "support",
      question: "What kind of support do you provide?",
      answer:
        "We provide comprehensive support including 24/7 live chat, email support, video tutorials, webinars, and one-on-one coaching sessions (depending on your package). Our support team is trained to help with technical issues, business guidance, and platform navigation. We also have a detailed knowledge base and FAQ section.",
    },
    {
      id: 9,
      category: "earnings",
      question: "Are there any hidden fees or charges?",
      answer:
        "No hidden fees! The package price you see is the total cost. There are no monthly subscriptions, hidden charges, or surprise fees. The only additional costs are optional upgrades to higher packages or premium training materials. All pricing is transparent and clearly displayed.",
    },
    {
      id: 10,
      category: "general",
      question: "Can I upgrade or downgrade my package later?",
      answer:
        "Yes, you can upgrade your package at any time to access more features and higher earning potential. Downgrades are also possible, but some features may be restricted. Contact our support team to discuss package changes and we'll help you find the best option for your needs.",
    },
    {
      id: 11,
      category: "technical",
      question: "What if I forget my password or get locked out?",
      answer:
        "No problem! You can reset your password using the 'Forgot Password' link on the login page. We'll send a secure reset link to your registered email. If you're still having trouble, contact our support team and we'll help you regain access to your account quickly.",
    },
    {
      id: 12,
      category: "billing",
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "We offer a 30-day money-back guarantee for all packages. If you're not completely satisfied with our platform within the first 30 days, contact our support team and we'll provide a full refund, no questions asked. We're confident you'll love our platform, but we want you to feel secure in your investment.",
    },
  ];

  // Calculate category counts
  categories.forEach((category) => {
    if (category.id !== "all") {
      category.count = faqs.filter(
        (faq) => faq.category === category.id
      ).length;
    } else {
      category.count = faqs.length;
    }
  });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-customer-ui-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-customer-brand-50 to-customer-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-customer-ui-text-primary mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-customer-brand-500 to-customer-accent-500 bg-clip-text text-transparent block">
              Questions
            </span>
          </h1>
          <p className="text-xl text-customer-ui-text-secondary mb-12 max-w-3xl mx-auto">
            Find answers to common questions about our MLM platform, features,
            and how to get started.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-customer-ui-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <p className="text-customer-ui-text-tertiary">
              {filteredFaqs.length} question
              {filteredFaqs.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-customer-ui-surface rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-customer-brand-50 transition-colors duration-200 rounded-2xl"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                      {faq.question}
                    </h3>
                    <div className="flex items-center">
                      <span className="inline-block px-3 py-1 bg-customer-brand-100 text-customer-brand-600 text-sm font-medium rounded-full">
                        {
                          categories.find((cat) => cat.id === faq.category)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {openItems[faq.id] ? (
                      <ChevronUp className="w-6 h-6 text-customer-brand-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-customer-ui-text-tertiary" />
                    )}
                  </div>
                </button>

                {openItems[faq.id] && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-customer-ui-border pt-4">
                      <p className="text-customer-ui-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-customer-ui-text-tertiary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-2">
                No questions found
              </h3>
              <p className="text-customer-ui-text-secondary mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-3 bg-customer-brand-500 text-white rounded-xl hover:bg-customer-brand-600 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-customer-ui-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-6">
            Still Have Questions?
          </h2>
          <p className="text-lg text-customer-ui-text-secondary mb-8">
            Can't find what you're looking for? Our support team is here to
            help!
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <MessageCircle className="w-8 h-8 text-customer-brand-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                Live Chat
              </h3>
              <p className="text-customer-ui-text-secondary text-sm mb-4">
                Get instant help from our support team
              </p>
              <button className="px-4 py-2 bg-customer-brand-500 text-white rounded-lg hover:bg-customer-brand-600 transition-colors duration-200">
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <Mail className="w-8 h-8 text-customer-brand-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                Email Support
              </h3>
              <p className="text-customer-ui-text-secondary text-sm mb-4">
                Send us a detailed message
              </p>
              <button className="px-4 py-2 bg-customer-brand-500 text-white rounded-lg hover:bg-customer-brand-600 transition-colors duration-200">
                Send Email
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <Phone className="w-8 h-8 text-customer-brand-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                Phone Support
              </h3>
              <p className="text-customer-ui-text-secondary text-sm mb-4">
                Call us for immediate assistance
              </p>
              <button className="px-4 py-2 bg-customer-brand-500 text-white rounded-lg hover:bg-customer-brand-600 transition-colors duration-200">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
