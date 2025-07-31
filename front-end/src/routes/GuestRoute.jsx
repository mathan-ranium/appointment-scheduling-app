import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute({ children }) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/booking" />;
    }

    return children;
}
