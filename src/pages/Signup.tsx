import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginSuccess } from '../store/authSlice';
import { signup } from '../services/AuthService';
import { validatePassword } from '../utils/passwordValidation';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const user = await signup(username, password);
      dispatch(loginSuccess({ id: user.id, username: user.username }));
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. Email might already be used.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Signup</h2>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Signup</button>
      </form>
      <p className="mt-2 text-sm">
        Have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
