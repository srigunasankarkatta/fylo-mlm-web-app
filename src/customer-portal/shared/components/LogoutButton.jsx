import React from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../../../app/store";

const LogoutButton = ({ className = "" }) => {
  const { logout, isLoading } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`flex items-center px-4 py-2 text-customer-brand-500 hover:text-customer-brand-600 transition-colors duration-200 font-medium disabled:opacity-50 ${className}`}
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
