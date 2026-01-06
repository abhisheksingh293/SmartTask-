import axios from 'axios';

// Use environment variable for API URL or fallback to relative path (proxy)
const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/auth`;

// Register user
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);

    if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
    }

    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('userInfo');
};

const authService = {
    register,
    login,
    logout
};

export default authService;
