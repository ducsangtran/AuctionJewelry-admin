import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, ...rest }) => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? element : <Navigate to="/login" />;
};
export const ValidRoute = ({ element, ...rest }) => {
    const userRole = localStorage.getItem("roleName");
    return userRole === "Manager" || userRole === "Admin" ? element : <Navigate to="/" />;
};

export const ValidUser = ({ element, ...rest }) => {
    const userRole = localStorage.getItem("roleName");
    return userRole === "Admin" ? element : <Navigate to="/" />;
};
