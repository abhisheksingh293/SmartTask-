import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LogOut, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-blue-600">
                    <CheckSquare size={24} />
                    <span>SmartTask Hub</span>
                </Link>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-700 font-medium">Hello, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
