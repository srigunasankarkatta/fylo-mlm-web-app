import React from "react";
import CustomerHeader from "../shared/partials/CustomerHeader";
import HeroSection from "../features/home/HeroSection";
import AutoPoolSection from "../features/home/AutoPoolSection";
import HighlightsSection from "../features/home/HighlightsSection";
import PackageTeaserSection from "../features/home/PackageTeaserSection";
import TrustSection from "../features/home/TrustSection";
import FinalCTASection from "../features/home/FinalCTASection";
import CustomerFooter from "../shared/partials/CustomerFooter";

const CustomerHomePage = () => {
  return (
    <div
      className="min-h-screen bg-customer-ui-background"
      data-theme="customer"
    >
      {/* Header */}
      <CustomerHeader />

      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* Auto Pool Introduction */}
      <section id="features">
        <AutoPoolSection />
      </section>

      {/* Key Highlights */}
      <HighlightsSection />

      {/* Package Teaser */}
      <section id="packages">
        <PackageTeaserSection />
      </section>

      {/* Trust Indicators */}
      <TrustSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Footer */}
      <CustomerFooter />
    </div>
  );
};

export default CustomerHomePage;
