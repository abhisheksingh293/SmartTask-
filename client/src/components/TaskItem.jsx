import { Edit2, Trash2, Calendar, Clock, CheckCircle } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onStatusCheck }) => {
    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    const statusColors = {
        'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
        'completed': 'bg-green-100 text-green-800 border-green-200'
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold text-lg text-gray-800 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[task.status] || 'bg-gray-100 text-gray-800'}`}>
                            {task.status.replace('-', ' ')}
                        </span>
                    </div>

                    {task.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {task.description}
                        </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        {task.dueDate && (
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{formatDate(task.dueDate)}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 ml-4">
                    <button
                        onClick={() => onStatusCheck(task)}
                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${task.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}
                        title="Mark as Complete"
                    >
                        <CheckCircle size={18} />
                    </button>
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
