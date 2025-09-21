import React from "react";
import CustomerHeader from "../partials/CustomerHeader";
import CustomerFooter from "../partials/CustomerFooter";

const CustomerLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-customer-ui-background"
      data-theme="customer"
    >
      {/* Header */}
      <CustomerHeader />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;
