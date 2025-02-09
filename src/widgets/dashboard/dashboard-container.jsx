import React from 'react';
import { DashboardNavbar, Sidenav } from '../layout';

const DashboardContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardContainer;
