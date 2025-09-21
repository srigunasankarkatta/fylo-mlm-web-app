import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../app/store";
import LogoutButton from "../../shared/components/LogoutButton";
import {
  DollarSign,
  Users,
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  RefreshCcw,
  User,
  Mail,
  Phone,
  Calendar,
  Key,
  Crown,
  Activity,
  AlertCircle,
  Network,
  BarChart3,
  Wallet,
  Target,
} from "lucide-react";

const DashboardPage = () => {
  const { user, getProfile, isLoading, error } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch latest user profile data
    getProfile().catch(console.error);
  }, [getProfile]);

  // Mock earnings data - will be replaced with actual API calls
  const earningsData = {
    totalEarnings: 2450.0,
    levelIncome: 1200.0,
    fastTrackIncome: 800.0,
    clubIncome: 300.0,
    autoPoolIncome: 150.0,
    thisMonth: 450.0,
    lastMonth: 380.0,
  };

  const stats = [
    {
      title: "Total Earnings",
      value: `$${earningsData.totalEarnings.toLocaleString()}`,
      change: "+12.5%",
      icon: <DollarSign className="w-8 h-8" />,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 this week",
      icon: <Users className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Direct Referrals",
      value: "8",
      change: "+2 this month",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "Current Rank",
      value: "Gold Executive",
      change: "Level 3",
      icon: <Award className="w-8 h-8" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
  ];

  const earningsTypes = [
    {
      name: "Level Income",
      amount: earningsData.levelIncome,
      description: "Earnings from your downline levels",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Fast Track Income",
      amount: earningsData.fastTrackIncome,
      description: "Instant earnings from direct referrals",
      icon: <Zap className="w-5 h-5" />,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Club Income",
      amount: earningsData.clubIncome,
      description: "Earnings from club matrix system",
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      name: "Auto Pool Income",
      amount: earningsData.autoPoolIncome,
      description: "Company-funded pool earnings",
      icon: <Target className="w-5 h-5" />,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  const tabs = [
    {
      id: "overview",
      name: "Overview",
      icon: <Activity className="w-5 h-5" />,
    },
    { id: "profile", name: "Profile", icon: <User className="w-5 h-5" /> },
    {
      id: "network",
      name: "Network Tree",
      icon: <Network className="w-5 h-5" />,
    },
    { id: "earnings", name: "Earnings", icon: <Wallet className="w-5 h-5" /> },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-customer-ui-background">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-customer-ui-text-primary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700 p-4">
        <AlertCircle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Dashboard</h2>
        <p className="text-center mb-4">{error}</p>
        <button
          onClick={() => getProfile()}
          className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-200"
        >
          <RefreshCcw className="w-5 h-5 mr-2" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-customer-ui-background">
      {/* Header */}
      <div className="bg-customer-ui-surface border-b border-customer-ui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-customer-ui-text-primary">
                Dashboard
              </h1>
              <p className="text-sm text-customer-ui-text-secondary">
                Welcome back, {user?.name || "User"}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-customer-ui-surface border-b border-customer-ui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-customer-brand-500 text-customer-brand-600"
                    : "border-transparent text-customer-ui-text-secondary hover:text-customer-ui-text-primary hover:border-customer-ui-border"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bgColor} p-3 rounded-xl`}>
                      <div className={stat.color}>{stat.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-green-500">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-customer-ui-text-primary mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-customer-ui-text-secondary">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-customer-ui-text-primary mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className="flex items-center p-4 rounded-lg border border-customer-ui-border hover:border-customer-brand-500 hover:bg-customer-brand-50 transition-all duration-200"
                >
                  <User className="w-6 h-6 text-customer-brand-500 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-customer-ui-text-primary">
                      View Profile
                    </p>
                    <p className="text-sm text-customer-ui-text-secondary">
                      Account details
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("network")}
                  className="flex items-center p-4 rounded-lg border border-customer-ui-border hover:border-customer-brand-500 hover:bg-customer-brand-50 transition-all duration-200"
                >
                  <Network className="w-6 h-6 text-customer-brand-500 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-customer-ui-text-primary">
                      Network Tree
                    </p>
                    <p className="text-sm text-customer-ui-text-secondary">
                      View your team
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("earnings")}
                  className="flex items-center p-4 rounded-lg border border-customer-ui-border hover:border-customer-brand-500 hover:bg-customer-brand-50 transition-all duration-200"
                >
                  <Wallet className="w-6 h-6 text-customer-brand-500 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-customer-ui-text-primary">
                      Earnings
                    </p>
                    <p className="text-sm text-customer-ui-text-secondary">
                      Income details
                    </p>
                  </div>
                </button>
                <button className="flex items-center p-4 rounded-lg border border-customer-ui-border hover:border-customer-brand-500 hover:bg-customer-brand-50 transition-all duration-200">
                  <BarChart3 className="w-6 h-6 text-customer-brand-500 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-customer-ui-text-primary">
                      Analytics
                    </p>
                    <p className="text-sm text-customer-ui-text-secondary">
                      Performance metrics
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-8">
            <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
              <h2 className="text-2xl font-bold text-customer-ui-text-primary mb-6">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                    <div>
                      <p className="text-sm text-customer-ui-text-secondary">
                        Full Name
                      </p>
                      <p className="font-medium text-customer-ui-text-primary">
                        {user?.name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                    <div>
                      <p className="text-sm text-customer-ui-text-secondary">
                        Email
                      </p>
                      <p className="font-medium text-customer-ui-text-primary">
                        {user?.email || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                    <div>
                      <p className="text-sm text-customer-ui-text-secondary">
                        Phone
                      </p>
                      <p className="font-medium text-customer-ui-text-primary">
                        {user?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Key className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                    <div>
                      <p className="text-sm text-customer-ui-text-secondary">
                        Referral Code
                      </p>
                      <p className="font-medium text-customer-ui-text-primary font-mono">
                        {user?.referral_code || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Crown className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                    <div>
                      <p className="text-sm text-customer-ui-text-secondary">
                        Role
                      </p>
                      <p className="font-medium text-customer-ui-text-primary">
                        {user?.roles?.[0]?.name || "User"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                    <div>
                      <p className="text-sm text-customer-ui-text-secondary">
                        Member Since
                      </p>
                      <p className="font-medium text-customer-ui-text-primary">
                        {user?.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-customer-ui-text-primary mb-4">
                Account Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <ShieldCheck className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-customer-ui-text-secondary">
                      Status
                    </p>
                    <p className="font-medium text-green-600 capitalize">
                      {user?.status || "Active"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                  <div>
                    <p className="text-sm text-customer-ui-text-secondary">
                      Email Verified
                    </p>
                    <p className="font-medium text-customer-ui-text-primary">
                      {user?.email_verified_at ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
                  <div>
                    <p className="text-sm text-customer-ui-text-secondary">
                      Phone Verified
                    </p>
                    <p className="font-medium text-customer-ui-text-primary">
                      {user?.phone_verified_at ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Network Tree Tab */}
        {activeTab === "network" && (
          <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
            <h2 className="text-2xl font-bold text-customer-ui-text-primary mb-6">
              Network Tree
            </h2>
            <div className="text-center py-12">
              <Network className="w-16 h-16 text-customer-ui-text-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                Network Tree Coming Soon
              </h3>
              <p className="text-customer-ui-text-secondary">
                Your network visualization will be available here once the API
                is integrated.
              </p>
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <div className="space-y-8">
            {/* Earnings Summary */}
            <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
              <h2 className="text-2xl font-bold text-customer-ui-text-primary mb-6">
                Earnings Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-customer-brand-500">
                    ${earningsData.totalEarnings.toLocaleString()}
                  </p>
                  <p className="text-customer-ui-text-secondary">
                    Total Earnings
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">
                    ${earningsData.thisMonth.toLocaleString()}
                  </p>
                  <p className="text-customer-ui-text-secondary">This Month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-customer-ui-text-primary">
                    ${earningsData.lastMonth.toLocaleString()}
                  </p>
                  <p className="text-customer-ui-text-secondary">Last Month</p>
                </div>
              </div>
            </div>

            {/* Earnings by Type */}
            <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-customer-ui-text-primary mb-6">
                Earnings by Type
              </h3>
              <div className="space-y-4">
                {earningsTypes.map((earning, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-customer-ui-border"
                  >
                    <div className="flex items-center">
                      <div className={`${earning.bgColor} p-2 rounded-lg mr-4`}>
                        <div className={earning.color}>{earning.icon}</div>
                      </div>
                      <div>
                        <p className="font-medium text-customer-ui-text-primary">
                          {earning.name}
                        </p>
                        <p className="text-sm text-customer-ui-text-secondary">
                          {earning.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-customer-ui-text-primary">
                        ${earning.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
