import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  UserPlus,
  Phone,
} from "lucide-react";
import { useAuthStore } from "../../../app/store";

// Yup validation schema matching backend API
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(150, "Name must not exceed 150 characters"),
  email: Yup.string().nullable().email("Please enter a valid email address"),
  phone: Yup.string().nullable().max(30, "Phone must not exceed 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  referral_code: Yup.string()
    .nullable()
    .max(20, "Referral code must not exceed 20 characters"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, isAuthenticated, clearError } =
    useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email"); // email or phone

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

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Validate that at least one contact method is provided
      if (!values.email && !values.phone) {
        setFieldError(
          "general",
          "Please provide either an email address or phone number"
        );
        setSubmitting(false);
        return;
      }

      // Prepare data based on login method
      const userData = {
        name: values.name,
        password: values.password,
        password_confirmation: values.password_confirmation,
        referral_code: values.referral_code || undefined,
      };

      // Add email or phone based on method
      if (loginMethod === "email" && values.email) {
        userData.email = values.email;
      } else if (loginMethod === "phone" && values.phone) {
        userData.phone = values.phone;
      }

      const result = await register(userData);

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setFieldError(
          "general",
          result.error || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setFieldError(
        "general",
        error.message || "Registration failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const passwordRequirements = [
    {
      text: "At least 6 characters",
      met: (password) => password && password.length >= 6,
    },
    {
      text: "Passwords match",
      met: (password, confirm) => password && confirm && password === confirm,
    },
  ];

  return (
    <div className="min-h-screen bg-customer-ui-background flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-customer-brand-500 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-customer-ui-text-primary mb-2">
            Create Your Account
          </h1>
          <p className="text-sm text-customer-ui-text-secondary">
            Join thousands of successful entrepreneurs and start building your
            MLM empire today.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-customer-ui-surface rounded-2xl shadow-soft p-6">
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              password_confirmation: "",
              referral_code: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                {/* Login Method Toggle */}
                <div className="flex justify-center mb-6">
                  <button
                    type="button"
                    onClick={() => setLoginMethod("email")}
                    className={`px-6 py-2 rounded-l-xl text-sm font-medium transition-all duration-200 ${
                      loginMethod === "email"
                        ? "bg-customer-brand-500 text-white shadow-md"
                        : "bg-customer-ui-border text-customer-ui-text-secondary hover:bg-customer-brand-100"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod("phone")}
                    className={`px-6 py-2 rounded-r-xl text-sm font-medium transition-all duration-200 ${
                      loginMethod === "phone"
                        ? "bg-customer-brand-500 text-white shadow-md"
                        : "bg-customer-ui-border text-customer-ui-text-secondary hover:bg-customer-brand-100"
                    }`}
                  >
                    Phone
                  </button>
                </div>

                {/* Row 1: Name and Email/Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-4 h-4" />
                      <Field
                        type="text"
                        name="name"
                        className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                          errors.name && touched.name
                            ? "border-red-300"
                            : "border-customer-ui-border"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="flex items-center mt-1 text-red-600 text-xs"
                    >
                      {(msg) => (
                        <div className="flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Email/Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
                      {loginMethod === "email"
                        ? "Email Address"
                        : "Phone Number"}{" "}
                      (Optional)
                    </label>
                    <div className="relative">
                      {loginMethod === "email" ? (
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-4 h-4" />
                      ) : (
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-4 h-4" />
                      )}
                      <Field
                        type={loginMethod === "email" ? "email" : "tel"}
                        name={loginMethod === "email" ? "email" : "phone"}
                        className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                          (loginMethod === "email"
                            ? errors.email
                            : errors.phone) &&
                          (loginMethod === "email"
                            ? touched.email
                            : touched.phone)
                            ? "border-red-300"
                            : "border-customer-ui-border"
                        }`}
                        placeholder={
                          loginMethod === "email"
                            ? "Enter your email address"
                            : "Enter your phone number"
                        }
                      />
                    </div>
                    <ErrorMessage
                      name={loginMethod === "email" ? "email" : "phone"}
                      component="div"
                      className="flex items-center mt-1 text-red-600 text-xs"
                    >
                      {(msg) => (
                        <div className="flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Row 2: Referral Code */}
                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
                    Referral Code (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-4 h-4" />
                    <Field
                      type="text"
                      name="referral_code"
                      className={`w-full pl-9 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                        errors.referral_code && touched.referral_code
                          ? "border-red-300"
                          : "border-customer-ui-border"
                      }`}
                      placeholder="Enter referral code (if any)"
                    />
                  </div>
                  <ErrorMessage
                    name="referral_code"
                    component="div"
                    className="flex items-center mt-1 text-red-600 text-xs"
                  >
                    {(msg) => (
                      <div className="flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <p className="text-xs text-customer-ui-text-tertiary mt-1">
                    If someone referred you, enter their referral code here
                  </p>
                </div>

                {/* Row 3: Password and Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-4 h-4" />
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`w-full pl-9 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                          errors.password && touched.password
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
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="flex items-center mt-1 text-red-600 text-xs"
                    >
                      {(msg) => (
                        <div className="flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-4 h-4" />
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="password_confirmation"
                        className={`w-full pl-9 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent ${
                          errors.password_confirmation &&
                          touched.password_confirmation
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
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password_confirmation"
                      component="div"
                      className="flex items-center mt-1 text-red-600 text-xs"
                    >
                      {(msg) => (
                        <div className="flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {passwordRequirements.map((requirement, index) => (
                    <div
                      key={index}
                      className={`flex items-center text-xs ${
                        requirement.met(
                          values.password,
                          values.password_confirmation
                        )
                          ? "text-green-600"
                          : "text-customer-ui-text-tertiary"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center ${
                          requirement.met(
                            values.password,
                            values.password_confirmation
                          )
                            ? "bg-green-100"
                            : "bg-customer-ui-border"
                        }`}
                      >
                        {requirement.met(
                          values.password,
                          values.password_confirmation
                        ) && <CheckCircle className="w-2 h-2 text-green-600" />}
                      </div>
                      {requirement.text}
                    </div>
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      <p className="text-red-700 text-xs">{error}</p>
                    </div>
                  </div>
                )}

                {/* General Error Message */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      <p className="text-red-700 text-xs">{errors.general}</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <p className="text-green-700 text-xs">
                        Registration successful! Redirecting to dashboard...
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full flex items-center justify-center px-4 py-2.5 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-soft hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-customer-ui-text-secondary">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-customer-brand-500 hover:text-customer-brand-600 font-medium transition-colors duration-200"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
