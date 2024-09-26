import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  // Fetch user details and posts when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/v1/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.user);
        setUserPosts(response.data.posts);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      {/* Profile Picture and Username */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
          <img src={userData.profilePicture || '../src/page/Default_pfp.jpg'} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold">{userData.username}</h2>
      </div>

      {/* User Posts */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.likes} Likes</span>
                <span>{post.views} Views</span>
                <span>{post.comments.length} Comments</span>
              </div>
            </div>
          ))
        ) : (
          <p>No posts to show</p>
        )}
      </div>

      {/* Logout Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
