import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  User,
  Building,
  MessageSquare,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "sales", label: "Sales Question" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing Issue" },
    { value: "partnership", label: "Partnership" },
    { value: "media", label: "Media Inquiry" },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["support@fylomlm.com", "sales@fylomlm.com"],
      description: "Send us an email and we'll respond within 24 hours",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Speak with our support team Monday-Friday 9AM-6PM EST",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Business Ave", "Suite 100, New York, NY 10001"],
      description: "Our headquarters is open for scheduled meetings",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 10AM - 4PM"],
      description: "We're here to help during business hours",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-customer-ui-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-customer-brand-50 to-customer-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-customer-ui-text-primary mb-6">
            Get in
            <span className="bg-gradient-to-r from-customer-brand-500 to-customer-accent-500 bg-clip-text text-transparent block">
              Touch
            </span>
          </h1>
          <p className="text-xl text-customer-ui-text-secondary mb-12 max-w-3xl mx-auto">
            Have questions about our MLM platform? We're here to help! Reach out
            to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-customer-ui-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-customer-brand-100 rounded-xl flex items-center justify-center text-customer-brand-500 mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, detailIndex) => (
                    <p
                      key={detailIndex}
                      className="text-customer-ui-text-secondary text-sm"
                    >
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-customer-ui-text-tertiary text-xs">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-customer-ui-text-primary mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-customer-ui-text-secondary">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-customer-ui-surface rounded-3xl shadow-soft p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-customer-brand-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-customer-ui-text-primary mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-customer-ui-text-secondary">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
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
                        required
                        className="w-full pl-10 pr-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customer-ui-text-tertiary w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                      Company
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                    placeholder="Enter the subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-customer-ui-text-tertiary w-5 h-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-customer-ui-border rounded-xl focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent resize-none"
                      placeholder="Enter your message here..."
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-customer-brand-500 hover:bg-customer-brand-600 disabled:bg-customer-brand-300 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-soft hover:shadow-medium flex items-center justify-center mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Live Chat CTA */}
      <section className="py-16 bg-gradient-to-r from-customer-brand-500 to-customer-accent-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Need Immediate Help?
          </h2>
          <p className="text-xl text-customer-brand-100 mb-8">
            Start a live chat with our support team for instant assistance.
          </p>
          <button className="px-8 py-4 bg-white text-customer-brand-500 rounded-xl font-semibold text-lg hover:bg-customer-brand-50 transition-all duration-300 shadow-soft hover:shadow-medium flex items-center justify-center mx-auto">
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Live Chat
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
