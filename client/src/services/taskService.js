import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

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

const deleteTask = async (taskId) => {
    const config = { headers: getAuthHeader() };
    const response = await axios.delete(`${API_URL}/${taskId}`, config);
    return response.data;
};

const taskService = {
    getTasks,
    createTask,
    deleteTask
};

export default taskService;
