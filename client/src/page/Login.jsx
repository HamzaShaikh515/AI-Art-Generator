import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!credentials.username || !credentials.password) {
      setMessage('Please fill in both fields.');
      setMessageType('error');
      return;
    }

    try {
      // Send a POST request to validate credentials
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        setMessage('Logged in successfully!');
        setMessageType('success');

        // Save JWT token to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Update login state
        setIsLoggedIn(true);

        // Navigate to the home page
        setTimeout(() => {
          navigate('/');
        }, 1000); // Short delay before redirecting
      } else {
        // Handle errors
        setMessage(data.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
      setMessageType('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {message && (
          <div className={`text-center p-3 mb-4 rounded ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
