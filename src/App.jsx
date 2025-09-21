import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CustomerLayout,
  HomePage,
  FeaturesPage,
  PackagesPage,
  FAQPage,
  ContactPage,
  LoginPage,
  RegisterPage,
} from "./customer-portal";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with CustomerLayout */}
        <Route
          path="/"
          element={
            <CustomerLayout>
              <HomePage />
            </CustomerLayout>
          }
        />
        <Route
          path="/features"
          element={
            <CustomerLayout>
              <FeaturesPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/packages"
          element={
            <CustomerLayout>
              <PackagesPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/faq"
          element={
            <CustomerLayout>
              <FAQPage />
            </CustomerLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <CustomerLayout>
              <ContactPage />
            </CustomerLayout>
          }
        />

        {/* Pages without CustomerLayout (full-screen auth pages) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
