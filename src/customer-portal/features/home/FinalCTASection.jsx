import React from "react";
import { ArrowRight, UserPlus, LogIn } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-customer-brand-500 to-customer-accent-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-white rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Access Your{" "}
            <span className="text-customer-accent-200">Earnings</span>?
          </h2>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful members and start building your wealth
            today. Your financial future starts with a single click.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group flex items-center px-8 py-4 bg-white text-customer-brand-500 hover:bg-customer-brand-50 rounded-xl font-semibold text-lg transition-all duration-300 shadow-soft hover:shadow-medium transform hover:-translate-y-1">
              <LogIn className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Login to Your Account
            </button>

            <button className="group flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-customer-brand-500 rounded-xl font-semibold text-lg transition-all duration-300">
              <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Become a Member
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm font-medium">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm font-medium">Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-customer-accent-200 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">
                Limited Time Offer
              </span>
            </div>
            <p className="text-white/90 text-lg">
              Get started today and receive a{" "}
              <span className="font-bold text-customer-accent-200">
                bonus 10%
              </span>{" "}
              on your first package upgrade!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
