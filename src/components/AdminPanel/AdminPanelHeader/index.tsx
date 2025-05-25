"use client";
import { Search, Bell, Settings } from "lucide-react";

import { logout } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const AdminPanelHeader = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout({ reason: "User logged out" } as any) as any);
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-64">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search room, guest, book, etc."
          className="bg-transparent border-none focus:outline-none text-sm flex-grow"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Bell size={20} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            2
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-medium">
            J
          </div>
          <div>
            <p className="text-sm font-medium">Jaylon Deriwart</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <Settings size={18} />
        <div>
          <button
            className="text-sm text-gray-600 hover:text-gray-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelHeader;
