import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Plus, Filter } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import taskService from '../services/taskService';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const fetchTasks = async () => {
        if (user) {
            try {
                const data = await taskService.getTasks();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks", error);
            }
        }
    };

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        } else {
            fetchTasks();
        }
    }, [user, loading, navigate]);

    const handleSaveTask = async (taskData) => {
        try {
            if (editingTask) {
                // Update
                const data = await taskService.updateTask(editingTask._id, taskData);
                setTasks(tasks.map(t => t._id === data._id ? data : t));
                addToast('Task updated successfully', 'success');
            } else {
                // Create
                const data = await taskService.createTask(taskData);
                setTasks([...tasks, data]);
                addToast('Task created successfully', 'success');
            }
            setEditingTask(null);
        } catch (error) {
            console.error("Error saving task", error);
            addToast('Failed to save task', 'error');
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await taskService.deleteTask(id);
                setTasks(tasks.filter((task) => task._id !== id));
                addToast('Task deleted', 'info');
            } catch (error) {
                console.error("Error deleting task", error);
                addToast('Failed to delete task', 'error');
            }
        }
    };

    const handleStatusCheck = async (task) => {
        // Cycle status: pending -> in-progress -> completed -> pending
        const statusCycle = {
            'pending': 'in-progress',
            'in-progress': 'completed',
            'completed': 'pending'
        };
        const newStatus = statusCycle[task.status] || 'pending';

        try {
            const data = await taskService.updateTask(task._id, { status: newStatus });
            setTasks(tasks.map(t => t._id === data._id ? data : t));
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const filteredAndSortedTasks = tasks
        .filter(task => {
            const matchesFilter = filter === 'all' || task.status === filter;
            const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === 'dueDate') {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            return 0;
        });

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
                    />

                    {/* Sort Dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer w-full md:w-auto"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="dueDate">Due Date</option>
                    </select>

                    <div className="relative w-full md:w-auto">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer w-full"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
                    >
                        <Plus size={20} /> New Task
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedTasks.length > 0 ? (
                    filteredAndSortedTasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onEdit={openEditModal}
                            onDelete={handleDeleteTask}
                            onStatusCheck={handleStatusCheck}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500 mb-2">No tasks found</p>
                        <button onClick={openCreateModal} className="text-blue-600 hover:underline">
                            Create a new task
                        </button>
                    </div>
                )}
            </div>

            <TaskForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveTask}
                initialData={editingTask}
            />
        </div>
    );
};

export default Dashboard;
