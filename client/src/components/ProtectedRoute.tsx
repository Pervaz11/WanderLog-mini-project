import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        let parsedUser = null;

        try {
            parsedUser = storedUser ? JSON.parse(storedUser) : null;
        } catch {
            parsedUser = null;
        }

        setIsAuthenticated(!!parsedUser);
        setLoading(false);
    }, []);

    if (loading) {
        return <p>Yüklənir...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
