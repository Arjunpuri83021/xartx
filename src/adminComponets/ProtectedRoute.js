import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAdminLoggedIn"); // Replace with your authentication logic

    return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
