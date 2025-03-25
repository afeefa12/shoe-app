import React from 'react';
import AdminSidebar from './Sidebar';


const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
  );
};

export default AdminLayout;