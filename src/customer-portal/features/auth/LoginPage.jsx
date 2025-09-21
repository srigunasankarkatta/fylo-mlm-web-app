import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle,
  Smartphone,
} from "lucide-react";
import { useAuthStore } from "../../../app/store";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // email or phone
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      const credentials = {
        [loginMethod]: formData.email,
        password: formData.password,
      };

      const result = await login(credentials);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrors({
          general: result.error || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      setErrors({
        general: error.message || "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-customer-ui-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-customer-brand-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-customer-ui-text-primary">
            Welcome Back
          </h2>
          <p className="mt-2 text-customer-ui-text-secondary">
            Sign in to your Fylo MLM account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-customer-ui-surface rounded-3xl shadow-soft p-8">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-customer-brand-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-customer-ui-text-primary mb-2">
                Login Successful!
              </h3>
              <p className="text-customer-ui-text-secondary">
                Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <>
              {/* Login Method Toggle */}
              <div className="flex bg-customer-ui-border rounded-xl p-1 mb-6">
                <button
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    loginMethod === "email"
                      ? "bg-customer-brand-500 text-white"
                      : "text-customer-ui-text-tertiary hover:text-customer-ui-text-primary"
                  }`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </button>
                <button
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    loginMethod === "phone"
                      ? "bg-customer-brand-500 text-white"
                      : "text-customer-ui-text-tertiary hover:text-customer-ui-text-primary"
                  }`}
                >
                  <Smartphone className="w-4 h-4 inline mr-2" />
                  Phone
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email/Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    {loginMethod === "email" ? "Email Address" : "Phone Number"}
                  </label>
                  <div className="relative">
                    {loginMethod === "email" ? (
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                    ) : (
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                    )}
                    <input
                      type={loginMethod === "email" ? "email" : "tel"}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                        errors.email
                          ? "border-red-300"
                          : "border-customer-ui-border"
                      }`}
                      placeholder={
                        loginMethod === "email"
                          ? "Enter your email"
                          : "Enter your phone number"
                      }
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Password
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
                      placeholder="Enter your password"
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-customer-brand-500 focus:ring-customer-brand-500 border-customer-ui-border rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-customer-ui-text-secondary"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-customer-brand-500 hover:text-customer-brand-600 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-soft text-sm font-medium text-white bg-customer-brand-500 hover:bg-customer-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customer-brand-500 disabled:bg-customer-brand-300 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-customer-ui-text-secondary">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-customer-brand-500 hover:text-customer-brand-600 font-medium"
                  >
                    Sign up here
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
