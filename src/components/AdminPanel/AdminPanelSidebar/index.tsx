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
const SidebarItem = ({
  icon,
  label,
  notification = 0,
  hasSubmenu = false,
}: any) => {
  return (
    <div className="flex items-center p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
      <div className="w-6 h-6 mr-2 flex items-center justify-center">
        {icon}
      </div>
      <span>{label}</span>
      {notification > 0 && (
        <div className="ml-auto bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {notification}
        </div>
      )}
      {hasSubmenu && <ChevronDown size={14} className="ml-auto" />}
    </div>
  );
};

const AdminPanelSidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4">
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 mr-2 bg-primary flex items-center justify-center">
          <img src="/navbar-logo.png" alt="logo" width="70" height="70" />
        </div>
        <span className="text-xl font-bold">StayEasy</span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center bg-gray-100 rounded-md p-2 text-sm font-medium">
          <div className="w-6 h-6 mr-2 flex items-center justify-center">
            <Menu size={16} />
          </div>
          <span>Dashboard</span>
        </div>

        <SidebarItem
          icon={<Calendar size={16} />}
          label="Reservation"
          notification={0}
        />
        <SidebarItem
          icon={<Users size={16} />}
          label="Rooms"
          notification={0}
        />
        <SidebarItem
          icon={<MessageSquare size={16} />}
          label="Messages"
          notification={2}
        />
        <SidebarItem
          icon={<ClipboardList size={16} />}
          label="Housekeeping"
          notification={0}
        />
        <SidebarItem
          icon={<Briefcase size={16} />}
          label="Inventory"
          notification={0}
        />
        <SidebarItem
          icon={<Calendar size={16} />}
          label="Calendar"
          notification={0}
        />
        <SidebarItem
          icon={<DollarSign size={16} />}
          label="Financials"
          notification={0}
          hasSubmenu={true}
        />
        <SidebarItem
          icon={<Star size={16} />}
          label="Reviews"
          notification={0}
        />
        <SidebarItem
          icon={<Users size={16} />}
          label="Concierge"
          notification={0}
        />
      </div>
    </div>
  );
};

export default AdminPanelSidebar;
