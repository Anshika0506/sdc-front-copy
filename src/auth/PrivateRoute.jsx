import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
