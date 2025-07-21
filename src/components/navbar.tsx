import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';
import { useState } from 'react';

const NavBar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary text-black px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">📝 MyToDoApp</Link>

      <button className="md:hidden" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`${open ? 'block' : 'hidden'} md:flex md:items-center md:space-x-4`}>
        {!auth.isAuthenticated ? (
          <>
            <Link to="/login" className="block mt-2 md:mt-0 hover:underline">Login</Link>
            <Link to="/signup" className="block mt-2 md:mt-0 hover:underline">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="block mt-2 md:mt-0 hover:underline">Dashboard</Link>
            <Link to="/tasks" className="block mt-2 md:mt-0 hover:underline">Tasks</Link>
            <Link to="/calendar" className="block mt-2 md:mt-0 hover:underline">Calendar</Link>
            <button
              onClick={() => dispatch(logout())}
              className="block mt-2 md:mt-0 bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
