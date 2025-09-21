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
    { id: "structure", name: "Structure", count: 0 },
    { id: "getting-started", name: "Getting Started", count: 0 },
    { id: "earnings", name: "Earnings", count: 0 },
    { id: "auto-pool", name: "Auto Pool", count: 0 },
    { id: "general", name: "General", count: 0 },
  ];

  const faqs = [
    {
      id: 1,
      category: "structure",
      question: "How does the 4-referral limit work? What is spillover?",
      answer:
        "Our system uses a forced 4x10 matrix structure. Each member can only have 4 direct referrals maximum. When someone tries to refer a 5th person, that person automatically 'spills over' to fill empty positions in your downline. This ensures balanced growth and prevents any single person from dominating the structure. Spillover benefits everyone by filling gaps and creating opportunities for all members.",
    },
    {
      id: 2,
      category: "getting-started",
      question: "What does the package I buy determine?",
      answer:
        "Your package level determines your earning potential across ALL income streams, especially the Auto Pool. Higher packages unlock access to more lucrative Auto Pool levels with greater commission percentages. For example, buying the Gold package grants you entry into the Level 3 Gold Auto Pool, while the NBNB package gives you access to the highest Level 10 Auto Pool with maximum earning potential.",
    },
    {
      id: 3,
      category: "earnings",
      question: "How do I make money? How many income streams are there?",
      answer:
        "There are 4 powerful income streams: 1) Level Income - 0.5 units instantly credited to every person in your upline chain when someone joins, 2) Fast Track Income - instant commissions when team members buy packages, 3) Club Income - 10-level matrix with exponential growth (4, 16, 64...), and 4) Auto Pool Income - company-funded pools with massive commission percentages. All streams work together to maximize your earning potential.",
    },
    {
      id: 4,
      category: "earnings",
      question: "How far up does the Level Income go?",
      answer:
        "Level Income goes all the way to the top of your upline chain! When someone joins your team, every single person above you in the chain receives 0.5 units instantly. This rewards leadership and team building at every level. The more people you have above you, the more Level Income you can potentially receive as your downline grows.",
    },
    {
      id: 5,
      category: "earnings",
      question: "When do Fast Track commissions get paid?",
      answer:
        "Fast Track commissions are paid INSTANTLY! As soon as someone in your downline purchases a package, a pre-configured percentage is immediately credited to your account. There are no waiting periods, no monthly cycles - you get rewarded immediately for your mentorship and guidance. This creates instant gratification and motivation to help your team succeed.",
    },
    {
      id: 6,
      category: "earnings",
      question: "How does the Club Income matrix work?",
      answer:
        "Club Income uses a 10-level matrix with exponential growth: Level 1 = 4 persons = $4, Level 2 = 16 persons = $16, Level 3 = 64 persons = $64, and so on up to Level 10. Each level has a specific payout amount, and the income grows exponentially as your team expands. This creates massive earning potential as your network grows deeper.",
    },
    {
      id: 7,
      category: "auto-pool",
      question: "What is the Auto Pool? How is it funded?",
      answer:
        "The Auto Pool is our most powerful feature - it's funded by the company's share of revenue, NOT from member fees! This makes it completely sustainable. There are 10 Auto Pools (one for each package level: Bronze to NBNB), each with 8 sub-levels containing massive, pre-defined commission percentages. The company funds these pools from its revenue, ensuring long-term sustainability and growth.",
    },
    {
      id: 8,
      category: "auto-pool",
      question: "How do I qualify for a specific Auto Pool level?",
      answer:
        "You qualify for an Auto Pool level by purchasing the corresponding package. For example, buying the Silver package grants you entry into the Level 2 Silver Auto Pool, while the Ethereum package gives you access to the Level 9 Ethereum Auto Pool. Higher packages unlock more lucrative Auto Pool levels with greater commission percentages and earning opportunities.",
    },
    {
      id: 9,
      category: "general",
      question: "Is this sustainable?",
      answer:
        "Yes, absolutely! Our system is designed for long-term sustainability. The Auto Pool is funded by company revenue, not member fees, making it completely sustainable. The 4x10 matrix structure ensures balanced growth and prevents saturation. We have multiple income streams, transparent operations, and a proven business model that has helped thousands of members achieve financial success.",
    },
    {
      id: 10,
      category: "getting-started",
      question: "What's the best package to start with?",
      answer:
        "We recommend starting with the Bronze package ($99) to get familiar with the system, then upgrading as you see results. However, higher packages unlock more lucrative Auto Pool levels immediately. Many successful members start with Gold ($399) or higher to access better Auto Pool levels from day one. Your package level determines your earning potential across all income streams.",
    },
    {
      id: 11,
      category: "structure",
      question: "What happens if I don't get 4 direct referrals?",
      answer:
        "No problem! The system is designed to help everyone succeed. If you don't reach 4 direct referrals, spillover from other members will fill your empty positions. This means you can still benefit from the growth of the entire network, even if you're not actively recruiting. The balanced structure ensures everyone has opportunities to earn.",
    },
    {
      id: 12,
      category: "auto-pool",
      question: "How often are Auto Pool commissions distributed?",
      answer:
        "Auto Pool commissions are distributed automatically as users advance through levels. The system tracks your progress and distributes payments based on your current level and the pre-defined commission percentages. Higher Auto Pool levels have more frequent distributions and larger commission amounts. Everything is automated - no manual tracking required!",
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
