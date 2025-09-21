import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Phone,
  Building,
  MapPin,
  Calendar,
  UserPlus,
} from "lucide-react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    company: "",
    country: "",
    dateOfBirth: "",
    agreeToTerms: false,
    agreeToMarketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Japan",
    "South Korea",
    "Singapore",
    "India",
    "Brazil",
    "Mexico",
    "Argentina",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password =
          "Password must contain uppercase, lowercase, and number";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 3) {
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.agreeToTerms)
        newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsLoading(false);
    setIsSuccess(true);
  };

  const steps = [
    {
      number: 1,
      title: "Personal Info",
      description: "Basic information about you",
    },
    { number: 2, title: "Security", description: "Create your password" },
    {
      number: 3,
      title: "Preferences",
      description: "Additional details and agreements",
    },
  ];

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "One number", met: /\d/.test(formData.password) },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-customer-ui-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="w-20 h-20 text-customer-brand-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-4">
            Registration Successful!
          </h2>
          <p className="text-customer-ui-text-secondary mb-8">
            Welcome to Fylo MLM! Your account has been created successfully.
            Please check your email to verify your account.
          </p>
          <button className="px-8 py-3 bg-customer-brand-500 text-white rounded-xl font-semibold hover:bg-customer-brand-600 transition-colors duration-200">
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-customer-ui-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-customer-brand-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-customer-ui-text-primary">
            Join Fylo MLM
          </h2>
          <p className="mt-2 text-customer-ui-text-secondary">
            Start your MLM journey and build your network today
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? "bg-customer-brand-500 border-customer-brand-500 text-white"
                      : "border-customer-ui-border text-customer-ui-text-tertiary"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-customer-ui-text-primary"
                        : "text-customer-ui-text-tertiary"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-customer-ui-text-tertiary">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 h-0.5 mx-4 ${
                      currentStep > step.number
                        ? "bg-customer-brand-500"
                        : "bg-customer-ui-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-customer-ui-surface rounded-3xl shadow-soft p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-6">
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                          errors.firstName
                            ? "border-red-300"
                            : "border-customer-ui-border"
                        }`}
                        placeholder="Enter your first name"
                      />
                    </div>
                    {errors.firstName && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.firstName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                          errors.lastName
                            ? "border-red-300"
                            : "border-customer-ui-border"
                        }`}
                        placeholder="Enter your last name"
                      />
                    </div>
                    {errors.lastName && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                        errors.email
                          ? "border-red-300"
                          : "border-customer-ui-border"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                        errors.phone
                          ? "border-red-300"
                          : "border-customer-ui-border"
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Security */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-6">
                  Create Your Password
                </h3>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                        errors.password
                          ? "border-red-300"
                          : "border-customer-ui-border"
                      }`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary hover:text-customer-ui-text-primary"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-customer-brand-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-customer-ui-text-primary mb-3">
                    Password Requirements:
                  </h4>
                  <div className="space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center ${
                            req.met
                              ? "bg-customer-brand-500"
                              : "bg-customer-ui-border"
                          }`}
                        >
                          {req.met && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            req.met
                              ? "text-customer-ui-text-primary"
                              : "text-customer-ui-text-tertiary"
                          }`}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-customer-ui-border"
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary hover:text-customer-ui-text-primary"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-6">
                  Additional Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Company (Optional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                      Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent appearance-none ${
                          errors.country
                            ? "border-red-300"
                            : "border-customer-ui-border"
                        }`}
                      >
                        <option value="">Select your country</option>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.country && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.country}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                          errors.dateOfBirth
                            ? "border-red-300"
                            : "border-customer-ui-border"
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <div className="flex items-center mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.dateOfBirth}
                      </div>
                    )}
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-customer-brand-500 focus:ring-customer-brand-500 border-customer-ui-border rounded mt-1"
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="ml-3 block text-sm text-customer-ui-text-secondary"
                    >
                      I agree to the{" "}
                      <button className="text-customer-brand-500 hover:text-customer-brand-600 font-medium">
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button className="text-customer-brand-500 hover:text-customer-brand-600 font-medium">
                        Privacy Policy
                      </button>{" "}
                      *
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <div className="flex items-center text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.agreeToTerms}
                    </div>
                  )}

                  <div className="flex items-start">
                    <input
                      id="agreeToMarketing"
                      name="agreeToMarketing"
                      type="checkbox"
                      checked={formData.agreeToMarketing}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-customer-brand-500 focus:ring-customer-brand-500 border-customer-ui-border rounded mt-1"
                    />
                    <label
                      htmlFor="agreeToMarketing"
                      className="ml-3 block text-sm text-customer-ui-text-secondary"
                    >
                      I would like to receive marketing communications and
                      updates about new features
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-customer-ui-border text-customer-ui-text-primary rounded-xl font-medium hover:bg-customer-ui-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-customer-brand-500 text-white rounded-xl font-medium hover:bg-customer-brand-600 transition-all duration-200 flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-customer-brand-500 text-white rounded-xl font-medium hover:bg-customer-brand-600 disabled:bg-customer-brand-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-customer-ui-text-secondary">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-customer-brand-500 hover:text-customer-brand-600 font-medium"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
