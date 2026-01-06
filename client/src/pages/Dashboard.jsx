import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Plus } from 'lucide-react';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    // Authorization header helper
    const getAuthHeader = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo && userInfo.token ? { Authorization: `Bearer ${userInfo.token}` } : {};
    };

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        const fetchTasks = async () => {
            if (user) {
                try {
                    const config = { headers: getAuthHeader() };
                    const { data } = await axios.get('http://localhost:5000/api/tasks', config);
                    setTasks(data);
                } catch (error) {
                    console.error("Error fetching tasks", error);
                }
            }
        };
        fetchTasks();
    }, [user]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: getAuthHeader() };
            const { data } = await axios.post('http://localhost:5000/api/tasks', { title: newTaskTitle }, config);
            setTasks([...tasks, data]);
            setNewTaskTitle('');
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                const config = { headers: getAuthHeader() };
                await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
                setTasks(tasks.filter((task) => task._id !== id));
            } catch (error) {
                console.error("Error deleting task", error);
            }
        }
    };

    // Simple inline Task Card for now
    const TaskCard = ({ task }) => (
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center mb-4">
            <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {task.status}
                </span>
            </div>
            <div className="flex space-x-2">
                {/* Logic for edit status could go here */}
                <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 hover:text-red-700">Delete</button>
            </div>
        </div>
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            </div>

            <form onSubmit={handleCreateTask} className="mb-8 flex gap-2">
                <input
                    type="text"
                    className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a new task..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                    <Plus size={20} /> Add
                </button>
            </form>

            <div className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No tasks found. Create one to get started!</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
