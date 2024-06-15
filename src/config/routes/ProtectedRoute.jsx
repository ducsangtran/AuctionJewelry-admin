import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
