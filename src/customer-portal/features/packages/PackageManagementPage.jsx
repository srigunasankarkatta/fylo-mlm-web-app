import React, { useState, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
  Search,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  Award,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import { usePackageStore } from "../../store/packageStore";

const PackageManagementPage = () => {
  const {
    packages,
    userPackages,
    isLoading,
    error,
    pagination,
    fetchPackages,
    fetchUserPackages,
    initiatePurchase,
    confirmPurchase,
    generateIdempotencyKey,
    clearError,
  } = usePackageStore();

  const [activeTab, setActiveTab] = useState("available");
  const [filters, setFilters] = useState({
    min_price: "",
    max_price: "",
    search: "",
  });
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    package_id: null,
    amount: 0,
    payment_gateway: "razorpay",
    idempotency_key: "",
    meta: {
      device: "web",
      user_agent: navigator.userAgent,
    },
  });

  useEffect(() => {
    fetchPackages();
    fetchUserPackages();
  }, [fetchPackages, fetchUserPackages]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const filterParams = {};
    if (filters.min_price)
      filterParams.min_price = parseFloat(filters.min_price);
    if (filters.max_price)
      filterParams.max_price = parseFloat(filters.max_price);

    fetchPackages(filterParams);
  };

  const handlePurchaseInitiate = (packageData) => {
    const idempotencyKey = generateIdempotencyKey();
    setPurchaseData({
      package_id: packageData.id,
      amount: parseFloat(packageData.price),
      payment_gateway: "razorpay",
      idempotency_key: idempotencyKey,
      meta: {
        device: "web",
        user_agent: navigator.userAgent,
      },
    });
    setSelectedPackage(packageData);
    setShowPurchaseModal(true);
  };

  const handlePurchaseConfirm = async () => {
    try {
      // First initiate the purchase
      const initiateResult = await initiatePurchase(purchaseData);

      if (initiateResult.success) {
        // Simulate payment processing (in real app, this would be handled by payment gateway)
        const mockPaymentReference = `razorpay_txn_${Date.now()}`;

        // Confirm the purchase
        const confirmResult = await confirmPurchase({
          idempotency_key: purchaseData.idempotency_key,
          payment_reference: mockPaymentReference,
          payment_status: "completed",
          gateway: "razorpay",
          gateway_meta: {
            raw: "mock_gateway_response",
            transaction_id: mockPaymentReference,
            fees: "2.50",
          },
        });

        if (confirmResult.success) {
          setShowPurchaseModal(false);
          setSelectedPackage(null);
          // Refresh packages
          fetchUserPackages();
        }
      }
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading && packages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-customer-ui-background">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-customer-ui-text-primary">Loading packages...</p>
        </div>
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
                Package Management
              </h1>
              <p className="text-sm text-customer-ui-text-secondary">
                Browse and manage your packages
              </p>
            </div>
            <button
              onClick={() => {
                fetchPackages();
                fetchUserPackages();
              }}
              className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-customer-ui-surface border-b border-customer-ui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("available")}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === "available"
                  ? "border-customer-brand-500 text-customer-brand-600"
                  : "border-transparent text-customer-ui-text-secondary hover:text-customer-ui-text-primary hover:border-customer-ui-border"
              }`}
            >
              <Package className="w-5 h-5 mr-2" />
              Available Packages
            </button>
            <button
              onClick={() => setActiveTab("purchased")}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === "purchased"
                  ? "border-customer-brand-500 text-customer-brand-600"
                  : "border-transparent text-customer-ui-text-secondary hover:text-customer-ui-text-primary hover:border-customer-ui-border"
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              My Packages ({userPackages.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
              <button
                onClick={clearError}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Available Packages Tab */}
        {activeTab === "available" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
                Filter Packages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={filters.min_price}
                    onChange={(e) =>
                      handleFilterChange("min_price", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={filters.max_price}
                    onChange={(e) =>
                      handleFilterChange("max_price", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                    placeholder="Search packages..."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={applyFilters}
                    className="w-full flex items-center justify-center px-4 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-customer-brand-100 rounded-xl flex items-center justify-center mr-3">
                        <Package className="w-6 h-6 text-customer-brand-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-customer-ui-text-primary">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-customer-ui-text-secondary">
                          Level {pkg.level_number}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-customer-brand-500 bg-customer-brand-100 px-2 py-1 rounded-full">
                      {pkg.code}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-3xl font-bold text-customer-ui-text-primary mb-2">
                      ${parseFloat(pkg.price).toLocaleString()}
                    </p>
                    <p className="text-sm text-customer-ui-text-secondary">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-customer-ui-text-secondary">
                      <Award className="w-4 h-4 mr-1" />
                      Level {pkg.level_number}
                    </div>
                    <button
                      onClick={() => handlePurchaseInitiate(pkg)}
                      className="flex items-center px-4 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {packages.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-customer-ui-text-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                  No packages found
                </h3>
                <p className="text-customer-ui-text-secondary">
                  Try adjusting your filters or check back later.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Purchased Packages Tab */}
        {activeTab === "purchased" && (
          <div className="space-y-6">
            <div className="bg-customer-ui-surface rounded-2xl p-6 shadow-soft">
              <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
                Your Purchased Packages
              </h3>

              {userPackages.length > 0 ? (
                <div className="space-y-4">
                  {userPackages.map((userPkg) => (
                    <div
                      key={userPkg.id}
                      className="border border-customer-ui-border rounded-lg p-4 hover:bg-customer-ui-background transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-customer-brand-100 rounded-xl flex items-center justify-center mr-4">
                            <Package className="w-6 h-6 text-customer-brand-500" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-customer-ui-text-primary">
                              {userPkg.package?.name || "Unknown Package"}
                            </h4>
                            <p className="text-sm text-customer-ui-text-secondary">
                              Level {userPkg.assigned_level} • $
                              {parseFloat(userPkg.amount_paid).toLocaleString()}
                            </p>
                            <p className="text-xs text-customer-ui-text-tertiary">
                              Purchased:{" "}
                              {new Date(
                                userPkg.created_at
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              userPkg.payment_status
                            )}`}
                          >
                            {userPkg.payment_status}
                          </span>
                          {getStatusIcon(userPkg.payment_status)}
                        </div>
                      </div>

                      {userPkg.payment_reference && (
                        <div className="mt-3 pt-3 border-t border-customer-ui-border">
                          <p className="text-xs text-customer-ui-text-tertiary">
                            Payment Reference: {userPkg.payment_reference}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-customer-ui-text-tertiary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-2">
                    No packages purchased yet
                  </h3>
                  <p className="text-customer-ui-text-secondary mb-4">
                    Browse available packages and start your MLM journey.
                  </p>
                  <button
                    onClick={() => setActiveTab("available")}
                    className="px-6 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Browse Packages
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-customer-ui-surface rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-customer-ui-text-primary mb-4">
              Confirm Purchase
            </h3>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-customer-brand-100 rounded-xl flex items-center justify-center mr-3">
                  <Package className="w-6 h-6 text-customer-brand-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-customer-ui-text-primary">
                    {selectedPackage.name}
                  </h4>
                  <p className="text-sm text-customer-ui-text-secondary">
                    Level {selectedPackage.level_number}
                  </p>
                </div>
              </div>

              <div className="bg-customer-ui-background rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-customer-ui-text-secondary">
                    Package Price:
                  </span>
                  <span className="font-semibold text-customer-ui-text-primary">
                    ${parseFloat(selectedPackage.price).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-customer-ui-text-secondary">
                    Payment Gateway:
                  </span>
                  <span className="font-semibold text-customer-ui-text-primary">
                    Razorpay
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 border border-customer-ui-border text-customer-ui-text-primary rounded-lg hover:bg-customer-ui-background transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchaseConfirm}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Confirm Purchase
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageManagementPage;
