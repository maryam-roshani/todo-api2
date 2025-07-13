import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { Link } from 'react-router-dom';


const NavBar: React.FC = () => {        
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();


  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4 font-bold">My ToDo App</Link>
        {auth.isAuthenticated && (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <Link to="/tasks" className="mr-4">Tasks</Link>
          </>
        )}
      </div>
      <div>
        {auth.isAuthenticated ? (
            <>
                <span className="mr-4">Hello, {auth.user?.username}</span>
                <button onClick={() => dispatch(logout())} className="bg-red-500 text-white px-2 py-1 rounded">
                Logout
                </button>
            </>        
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
