import { SignIn, SignUp } from '@/pages/auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardRoute } from './dashboard.route';
import ProtectedRoute from './protected.route';

export const MainRoute = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/dashboard/*"
        element={<ProtectedRoute element={<DashboardRoute />} />}
      />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
};

export default MainRoute;
