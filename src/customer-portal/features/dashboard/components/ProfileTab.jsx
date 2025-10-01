import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Key,
  Crown,
  Edit3,
  RefreshCcw,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import LogoutButton from "../../../shared/components/LogoutButton";

const ProfileTab = ({
  userProfile,
  isLoading,
  errors,
  isEditingProfile,
  setIsEditingProfile,
  isChangingPassword,
  setIsChangingPassword,
  showPassword,
  setShowPassword,
  profileForm,
  setProfileForm,
  passwordForm,
  setPasswordForm,
  successMessage,
  onProfileUpdate,
  onPasswordChange,
  onRefresh,
  formatCurrency,
}) => {
  // Debug logging
  console.log("ProfileTab Debug Info:");
  console.log("- userProfile:", userProfile);
  console.log("- userProfile?.user:", userProfile?.user);
  console.log(
    "- userProfile?.user?.referral_code:",
    userProfile?.user?.referral_code
  );
  console.log("- isLoading:", isLoading);
  console.log("- errors:", errors);

  return (
    <div className="bg-customer-ui-surface rounded-xl shadow-soft p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-customer-ui-text-primary">
          Your Profile Details
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            disabled={isLoading.profile}
            className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCcw
              className={`w-4 h-4 mr-2 ${
                isLoading.profile ? "animate-spin" : ""
              }`}
            />
            {isLoading.profile ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            disabled={isLoading.profile}
            className="flex items-center px-4 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditingProfile ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {errors.profile && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{errors.profile}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading.profile && !userProfile && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-customer-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-customer-ui-text-primary">
              Loading profile data...
            </p>
          </div>
        </div>
      )}

      {isEditingProfile ? (
        <form onSubmit={onProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    name: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    email: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({
                    ...profileForm,
                    phone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isLoading.profile}
              className="px-6 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading.profile ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditingProfile(false)}
              className="px-6 py-2 border border-customer-ui-border text-customer-ui-text-primary rounded-lg hover:bg-customer-ui-background transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : userProfile ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
            <div>
              <p className="text-sm text-customer-ui-text-secondary">
                Full Name
              </p>
              <p className="font-medium text-customer-ui-text-primary">
                {userProfile?.user?.name || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
            <div>
              <p className="text-sm text-customer-ui-text-secondary">Email</p>
              <p className="font-medium text-customer-ui-text-primary">
                {userProfile?.user?.email || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
            <div>
              <p className="text-sm text-customer-ui-text-secondary">Phone</p>
              <p className="font-medium text-customer-ui-text-primary">
                {userProfile?.user?.phone || "Not provided"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Key className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
            <div>
              <p className="text-sm text-customer-ui-text-secondary">
                Referral Code
              </p>
              <p className="font-medium text-customer-ui-text-primary font-mono">
                {userProfile?.user?.referral_code || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Crown className="w-5 h-5 text-customer-ui-text-tertiary mr-3" />
            <div>
              <p className="text-sm text-customer-ui-text-secondary">Role</p>
              <p className="font-medium text-customer-ui-text-primary">
                {userProfile?.user?.status || "User"}
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
                {userProfile?.user?.created_at
                  ? new Date(userProfile.user.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-customer-ui-text-tertiary mx-auto mb-4" />
          <p className="text-customer-ui-text-secondary mb-4">
            No profile data available. Click "Refresh" to load your profile.
          </p>
          <button
            onClick={onRefresh}
            className="flex items-center px-4 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200 mx-auto"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Load Profile
          </button>
        </div>
      )}

      {/* Referral Stats */}
      {userProfile?.referral_stats && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-customer-ui-text-primary mb-4">
            Referral Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-customer-brand-500">
                {userProfile.referral_stats.total_referrals || 0}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Total Referrals
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {userProfile.referral_stats.direct_referrals || 0}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Direct Referrals
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-500">
                {userProfile.referral_stats.indirect_referrals || 0}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Indirect Referrals
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-500">
                {formatCurrency(
                  userProfile.referral_stats.referral_earnings || 0
                )}
              </p>
              <p className="text-sm text-customer-ui-text-secondary">
                Referral Earnings
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Section */}
      <div className="border-t border-customer-ui-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-customer-ui-text-primary">
            Change Password
          </h3>
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200"
          >
            <Key className="w-4 h-4 mr-2" />
            {isChangingPassword ? "Cancel" : "Change Password"}
          </button>
        </div>

        {isChangingPassword && (
          <form onSubmit={onPasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      current_password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                  required
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
            </div>
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.new_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    new_password: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-customer-ui-text-primary mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.new_password_confirmation}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    new_password_confirmation: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-customer-ui-border rounded-lg focus:ring-2 focus:ring-customer-brand-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading.profile}
                className="px-6 py-2 bg-customer-brand-500 hover:bg-customer-brand-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading.profile ? "Changing..." : "Change Password"}
              </button>
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="px-6 py-2 border border-customer-ui-border text-customer-ui-text-primary rounded-lg hover:bg-customer-ui-background transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-8 text-right">
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfileTab;
