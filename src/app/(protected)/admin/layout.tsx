import AdminPanelHeader from "@/components/AdminPanel/AdminPanelHeader";
import AdminPanelSidebar from "@/components/AdminPanel/AdminPanelSidebar";
import React from "react";

const AdminLayout = ({ children }: any) => {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-50 text-gray-800">
        <AdminPanelSidebar />

        <div className="flex-1 flex flex-col">
          <AdminPanelHeader />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
