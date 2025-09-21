import React from "react";
import { ArrowRight, PlayCircle } from "lucide-react";
import { MLMTree } from "../../shared/components";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-customer-brand-50 via-customer-ui-background to-customer-accent-50">
        <div className="absolute inset-0 bg-gradient-to-r from-customer-brand-500/5 to-customer-accent-500/5 animate-pulse"></div>

        {/* MLM Tree Background */}
        <div className="absolute inset-0">
          <MLMTree className="heroBackground" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-customer-brand-200/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-customer-accent-200/30 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-customer-brand-300/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-customer-accent-300/20 rounded-lg rotate-12 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-customer-ui-text-primary mb-6 leading-tight">
            Maximize Your{" "}
            <span className="bg-gradient-to-r from-customer-brand-500 to-customer-accent-500 bg-clip-text text-transparent">
              Earnings Potential
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-customer-ui-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Leverage our unique Auto Pool structure and powerful compensation
            plan to build your wealth and achieve financial freedom.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group flex items-center px-8 py-4 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-soft hover:shadow-medium transform hover:-translate-y-1">
              Explore Your Dashboard
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button className="group flex items-center px-8 py-4 border-2 border-customer-brand-500 text-customer-brand-500 hover:bg-customer-brand-500 hover:text-white rounded-xl font-semibold text-lg transition-all duration-300">
              <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Learn How It Works
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-customer-ui-text-tertiary">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-customer-brand-500 rounded-full"></div>
              <span className="text-sm font-medium">100% Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-customer-accent-500 rounded-full"></div>
              <span className="text-sm font-medium">Secure Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-customer-brand-500 rounded-full"></div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-customer-ui-text-tertiary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-customer-ui-text-tertiary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
