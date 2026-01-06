import axios from 'axios';

// Use environment variable for API URL or fallback to relative path (proxy)
const API_URL = `${import.meta.env.VITE_API_URL || ''}/api/tasks`;

// Get user token from local storage
const getAuthHeader = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo && userInfo.token ? { Authorization: `Bearer ${userInfo.token}` } : {};
};

const getTasks = async () => {
    const config = { headers: getAuthHeader() };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const createTask = async (taskData) => {
    const config = { headers: getAuthHeader() };
    const response = await axios.post(API_URL, taskData, config);
    return response.data;
};

const updateTask = async (taskId, taskData) => {
    const config = { headers: getAuthHeader() };
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, config);
    return response.data;
};

const deleteTask = async (taskId) => {
    const config = { headers: getAuthHeader() };
    const response = await axios.delete(`${API_URL}/${taskId}`, config);
    return response.data;
};

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};

export default taskService;
