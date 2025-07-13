import { Link } from 'react-router-dom';

interface NavBarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4 font-bold">My ToDo App</Link>
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <Link to="/tasks" className="mr-4">Tasks</Link>
          </>
        )}
      </div>
      <div>
        {isAuthenticated ? (
          <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
