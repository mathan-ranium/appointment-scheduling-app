import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "../api/axois";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Set or clear token in Axios and localStorage
    const setAuthHeader = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    };

    // Get current user with stored token
    const getUser = async () => {
        try {
            const response = await axios.get("/user");
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setUser(null);
            setAuthHeader(null);
        } finally {
            setLoading(false);
        }
    };

    // On mount, restore token and try to fetch user
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setAuthHeader(storedToken);
            getUser();
        } else {
            setLoading(false);
        }
    }, []);

    // Register new user
    const register = async (userData) => {
        try {
            const response = await axios.post("/register", userData);
            const token = response.data.token;

            setAuthHeader(token);
            await getUser();
            navigate("/");

            return { success: response.data.message || "Registration successful" };
        } catch (error) {
            console.error("Registration error:", error);

            if (error.response?.data?.errors) {
                return { error: error.response.data.errors };
            } else if (error.response?.data?.message) {
                return { error: { general: [error.response.data.message] } };
            } else {
                return { error: { general: ["Registration failed. Please try again."] } };
            }
        }
    };

    // Login user
    const login = async (credentials) => {
        try {
            const response = await axios.post("/login", credentials);
            const token = response.data.token;

            setAuthHeader(token);
            await getUser();
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    // Logout user
    const logout = async () => {
        try {
            await axios.post("/logout");
        } catch (error) {
            console.error("Logout error (might already be invalid):", error);
        } finally {
            setAuthHeader(null);
            setUser(null);
            navigate("/login");
        }
    };

    const contextValue = useMemo(() => ({
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
    }), [user]);

    if (loading) return <LoadingSpinner />;

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
