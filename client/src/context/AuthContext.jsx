import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "http://localhost:5000/api/auth/login",
            { email, password },
            config
        );
        setUser(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
    };

    const register = async (username, email, password) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "http://localhost:5000/api/auth/register",
            { username, email, password },
            config
        );
        setUser(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
