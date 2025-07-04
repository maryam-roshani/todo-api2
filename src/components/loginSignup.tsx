import React, { useState } from 'react';
import InputField from './inputField';

type FormMode = 'login' | 'signup';

const LoginSignup: React.FC = () => {
  const [mode, setMode] = useState<FormMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    registerKey: '',
    dateOfBirth: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (mode === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }

      if (!/^\d{10}$/.test(formData.registerKey)) {
        newErrors.registerKey = 'Register key must be exactly 10 digits';
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      }
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&%*!?])[A-Za-z\d@$&%*!?]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        'Password must have uppercase, lowercase, number, special char, and at least 8 chars';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    if (mode === 'login') {
      alert('Logging in...');
      // Submit login logic here
    } else {
      alert('Signing up...');
      // Submit signup logic here
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">
        {mode === 'login' ? 'Login' : 'Signup'}
      </h1>
      <form onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <>
            <InputField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <InputField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

            <InputField
              label="Register Key"
              type="number"
              name="registerKey"
              value={formData.registerKey}
              onChange={handleChange}
              placeholder="10-digit register key"
            />
            {errors.registerKey && (
              <p className="text-red-500 text-sm">{errors.registerKey}</p>
            )}

            <InputField
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </>
        )}

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
        >
          {mode === 'login' ? 'Login' : 'Signup'}
        </button>
      </form>

      <p className="text-center mt-4">
        {mode === 'login' ? (
          <>
            No account?{' '}
            <button
              className="text-blue-600 underline"
              onClick={() => setMode('signup')}
            >
              Signup
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              className="text-blue-600 underline"
              onClick={() => setMode('login')}
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default LoginSignup;
