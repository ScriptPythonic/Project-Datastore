// src/components/Signup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      data: {
        matric_number: matricNumber,
      },
    });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl">
        {/* Image Box */}
        <div className="w-1/2 bg-blue-500 hidden lg:block">
          <img src="/path/to/your/image.jpg" alt="Signup" className="w-full h-full object-cover" />
        </div>
        {/* Signup Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
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
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <p className="mt-4 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-600">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
