import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginSuccess } from '../store/authSlice';
import { login } from '../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login(username, password);
      dispatch(loginSuccess({ id: user.id, username: user.username }));
      navigate(from);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border px-3 py-2 w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border px-3 py-2 w-full mb-2"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Login</button>
      </form>
      <p className="mt-2 text-sm">
        No account? <Link to="/signup" className="text-blue-500">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
