// src/components/Login.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: matricNumber, 
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
  };

  const handleBackToDashboard = () => {
    navigate('/'); // Navigate to the dashboard route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl">
        {/* Image Box */}
        <div className="w-1/2 bg-blue-500 hidden lg:block">
          <img src="/path/to/your/image.jpg" alt="Login" className="w-full h-full object-cover" />
        </div>
        {/* Login Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="matricNumber" className="block text-sm font-medium text-gray-700">Matric Number</label>
              <input
                type="text"
                id="matricNumber"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
              <button
                type="button"
                onClick={handleBackToDashboard}
                className="w-full bg-green-500 mt-2 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Back to Dashboard
              </button>
            <div className="mt-4 flex justify-between">
            
              <p className="text-center mt-4">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;