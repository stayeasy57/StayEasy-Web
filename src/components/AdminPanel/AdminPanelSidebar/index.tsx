"use client";

import {
  Search,
  Menu,
  Home,
  Calendar,
  MessageSquare,
  Users,
  ClipboardList,
  DollarSign,
  Star,
  Briefcase,
  ChevronDown,
  Plus,
  Bell,
  Settings,
  MoreHorizontal,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  route?: string;
  notification?: number;
  hasSubmenu?: boolean;
  isActive?: boolean;
}

const SidebarItem = ({
  icon,
  label,
  route = "",
  notification = 0,
  hasSubmenu = false,
  isActive = false,
}: SidebarItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <div
      className={`flex items-center p-2 text-sm rounded-md cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-gray-100 text-gray-900 font-medium"
          : "text-white hover:bg-gray-50 hover:text-gray-900"
      }`}
      onClick={handleClick}
    >
      <div className="w-6 h-6 mr-2 flex items-center justify-center">
        {icon}
      </div>
      <span className="flex-1">{label}</span>
      {notification > 0 && (
        <div className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {notification}
        </div>
      )}
      {hasSubmenu && <ChevronDown size={14} className="ml-1" />}
    </div>
  );
};

const AdminPanelSidebar = () => {
  const pathname = usePathname();

  // Helper function to check if route is active
  const isRouteActive = (route: string) => {
    if (route === "/admin" || route === "/admin/dashboard") {
      return pathname === "/admin" || pathname === "/admin/dashboard";
    }
    return pathname === route;
  };

  // Sidebar menu items configuration
  const menuItems = [
    {
      icon: <Menu size={16} />,
      label: "Dashboard",
      route: "/admin/dashboard",
    },
    {
      icon: <Users size={16} />,
      label: "Users",
      route: "/admin/users",
      notification: 0,
    },
    {
      icon: <Calendar size={16} />,
      label: "Properties",
      route: "/admin/properties",
      notification: 0,
    },
    {
      icon: <Users size={16} />,
      label: "Tenants",
      route: "/admin/tenants",
      notification: 0,
    },
    {
      icon: <Users size={16} />,
      label: "Landlords",
      route: "/admin/landlords",
      notification: 0,
    },
    {
      icon: <Briefcase size={16} />,
      label: "Bookings",
      route: "/admin/bookings",
      notification: 0,
    },
    {
      icon: <Briefcase size={16} />,
      label: "Reviews",
      route: "/admin/reviews",
      notification: 0,
    },
    {
      icon: <Briefcase size={16} />,
      label: "Support",
      route: "/admin/support",
      notification: 0,
    },
  ];

  return (
    <div className=" bg-primary border-r w-[260px] border-gray-200 h-screen p-4">
      {/* Logo Section */}
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 mr-2 bg-primary flex items-center justify-center">
          <img src="/navbar-logo.png" alt="logo" width="70" height="70" />
        </div>
        <span className="text-xl text-white font-bold">StayEasy</span>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            route={item.route}
            notification={item.notification}
            isActive={isRouteActive(item.route)}
          />
        ))}
      </nav>
    </div>
  );
};

export default AdminPanelSidebar;
