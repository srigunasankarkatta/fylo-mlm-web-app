// Color System Examples
// This file demonstrates how to use the color palette system

import React from "react";
import { colorUtils, COLORS } from "./color-utils.js";

// Example component showing different ways to use colors
export const ColorExamples = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">
        Customer Portal - Blue Color Theme
      </h1>

      {/* Base Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">Base Colors</h2>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(COLORS.PRIMARY).map(([shade, color]) => (
            <div key={shade} className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2"
                style={{ backgroundColor: color }}
              />
              <p className="text-sm text-neutral-600">Primary {shade}</p>
              <p className="text-xs text-neutral-500 font-mono">{color}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Authority Portal Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">
          Authority Portal Colors
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Brand Colors
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(COLORS.AUTHORITY.BRAND).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-12 h-12 rounded mx-auto mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-neutral-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Accent Colors
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(COLORS.AUTHORITY.ACCENT).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-12 h-12 rounded mx-auto mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-neutral-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Portal Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">
          Customer Portal Colors
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Brand Colors
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(COLORS.CUSTOMER.BRAND).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-12 h-12 rounded mx-auto mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-neutral-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Accent Colors
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(COLORS.CUSTOMER.ACCENT).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-12 h-12 rounded mx-auto mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-neutral-500">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Status Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">
          Status Colors
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Authority Status
            </h3>
            <div className="space-y-2">
              {Object.entries(COLORS.AUTHORITY.STATUS).map(
                ([status, color]) => (
                  <div key={status} className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-neutral-700 capitalize">
                      {status}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Customer Status
            </h3>
            <div className="space-y-2">
              {Object.entries(COLORS.CUSTOMER.STATUS).map(([status, color]) => (
                <div key={status} className="flex items-center space-x-3">
                  <div
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-neutral-700 capitalize">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-800">
          Usage Examples
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Authority Portal Buttons
            </h3>
            <div className="space-y-3">
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: COLORS.AUTHORITY.BRAND[500] }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: COLORS.AUTHORITY.ACCENT[500] }}
              >
                Secondary Button
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-3">
              Customer Portal Buttons
            </h3>
            <div className="space-y-3">
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: COLORS.CUSTOMER.BRAND[500] }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: COLORS.CUSTOMER.ACCENT[500] }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorExamples;
