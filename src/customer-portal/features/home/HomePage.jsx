import React from "react";
import HeroSection from "./HeroSection";
import AutoPoolSection from "./AutoPoolSection";
import HighlightsSection from "./HighlightsSection";
import PackageTeaserSection from "./PackageTeaserSection";
import TrustSection from "./TrustSection";
import FinalCTASection from "./FinalCTASection";

const HomePage = () => {
  return (
    <>
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
    </>
  );
};

export default HomePage;
