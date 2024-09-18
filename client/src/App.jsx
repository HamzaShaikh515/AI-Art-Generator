import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home, CreatePost, LoginPage, SignupPage } from './page';

const App = () => {
  return (
    <Router>
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
          {/* Right-side links (Login and Sign Up) */}
          <div>
            <Link to="/login" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-2">
              Login
            </Link>
            <Link to="/signup" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
