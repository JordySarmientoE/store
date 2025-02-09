import { getRoutesByRole } from '@/routes/routes';
import DashboardContainer from '@/widgets/dashboard/dashboard-container';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

export const DashboardRoute = () => {
  const [routes, setRoutes] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setRoutes(getRoutesByRole(user.role));
  }, [user]);

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          exact
          path={path}
          element={<DashboardContainer>{element}</DashboardContainer>}
          key={path}
        />
      ))}
      <Route
        path="*"
        element={
          <Navigate to={'/dashboard'.concat(routes[0]?.path ?? '')} replace />
        }
      />
    </Routes>
  );
};

export default DashboardRoute;
