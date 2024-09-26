import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Home, CreatePost, LoginPage, SignupPage } from './page';
import ProfilePage from './page/ProfilePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState(''); // State for logout message
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false); // Update login state
    setLogoutMessage('Logged out successfully!'); // Set logout message
    navigate('/'); // Redirect to home page

    // Clear the message after 3 seconds
    setTimeout(() => {
      setLogoutMessage('');
    }, 1500);
  };

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <nav className="flex justify-between w-full">
          {/* Left-side links (Home and Create Post) */}
          <div>
            <Link to="/" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2">
              Home
            </Link>
            <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
              Generate Art
            </Link>
          </div>
          {/* Right-side links */}
          <div>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2">
                  Login
                </Link>
                <Link to="/signup" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {logoutMessage && ( // Conditional rendering of the logout message
        <div className="bg-green-500 text-white text-center py-2">
          {logoutMessage}
        </div>
      )}

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <LoginPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
