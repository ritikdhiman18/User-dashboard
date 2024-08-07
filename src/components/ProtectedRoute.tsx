import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../Store/index';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
