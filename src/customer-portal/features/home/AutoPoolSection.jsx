import React from "react";
import { TrendingUp, Users, Zap } from "lucide-react";

const AutoPoolSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-customer-ui-background to-customer-brand-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-customer-ui-text-primary">
                The Power of{" "}
                <span className="text-customer-brand-500">Auto Pool</span>{" "}
                Income
              </h2>
              <p className="text-xl text-customer-ui-text-secondary leading-relaxed">
                Earn automatically from company-wide revenue as members join.
                Your package level unlocks incredible earning potential across
                multiple tiers of our structured Auto Pool.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-customer-brand-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-customer-brand-500" />
                </div>
                <div className="text-2xl font-bold text-customer-ui-text-primary">
                  10
                </div>
                <div className="text-sm text-customer-ui-text-secondary">
                  Levels
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-customer-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-customer-accent-500" />
                </div>
                <div className="text-2xl font-bold text-customer-ui-text-primary">
                  8
                </div>
                <div className="text-sm text-customer-ui-text-secondary">
                  Sub-Levels
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-customer-brand-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-customer-brand-500" />
                </div>
                <div className="text-2xl font-bold text-customer-ui-text-primary">
                  ∞
                </div>
                <div className="text-sm text-customer-ui-text-secondary">
                  Potential
                </div>
              </div>
            </div>
          </div>

          {/* Visual Aid - Interactive Pool Structure */}
          <div className="relative">
            <div className="bg-customer-ui-surface rounded-2xl p-8 shadow-soft border border-customer-ui-border">
              <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-6 text-center">
                Auto Pool Structure
              </h3>

              {/* Visual Representation */}
              <div className="space-y-4">
                {/* Level 10 - NBNB */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-customer-brand-500 to-customer-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-medium">
                    NBNB
                  </div>
                </div>

                {/* Level 9 */}
                <div className="flex justify-center space-x-2">
                  <div className="w-10 h-10 bg-customer-brand-400 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-soft"></div>
                  <div className="w-10 h-10 bg-customer-brand-400 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-soft"></div>
                </div>

                {/* Level 8 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-customer-brand-300 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>

                {/* Level 7 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 bg-customer-brand-200 rounded-lg flex items-center justify-center text-customer-ui-text-primary font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>

                {/* Level 6 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-customer-accent-200 rounded-lg flex items-center justify-center text-customer-ui-text-primary font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>

                {/* Level 5 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-customer-accent-100 rounded-lg flex items-center justify-center text-customer-ui-text-primary font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>

                {/* Level 4 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-customer-brand-100 rounded-lg flex items-center justify-center text-customer-ui-text-primary font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>

                {/* Level 3 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(14)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-customer-accent-100 rounded-lg flex items-center justify-center text-customer-ui-text-primary font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>

                {/* Level 2 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-customer-brand-50 rounded-lg flex items-center justify-center text-customer-ui-text-primary font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>

                {/* Level 1 - Bronze */}
                <div className="flex justify-center space-x-1">
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-customer-accent-50 rounded-lg flex items-center justify-center text-customer-ui-text-primary font-bold text-xs shadow-soft"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-customer-ui-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-customer-brand-500 rounded"></div>
                    <span className="text-customer-ui-text-secondary">
                      Your Level
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-customer-accent-500 rounded"></div>
                    <span className="text-customer-ui-text-secondary">
                      Earning Potential
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoPoolSection;
