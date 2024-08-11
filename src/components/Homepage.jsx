import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaHome, FaUpload, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from './div_loader'; 
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Project from './project';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchInput, setSearchInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delay for fetching keywords
    const fetchKeywords = () => {
      setTimeout(() => {
        setKeywords([
          'Computer Science',
          'Information Technology',
          'Software Engineering',
          'Cybersecurity',
        ]);
        setLoading(false);
      }, 2000); // 2 seconds delay for demonstration
    };

    fetchKeywords();
  }, []);

  const handleNavigation = (path, tabName) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSearch = () => {
    console.log(`Searching for: ${searchInput}`);
  };

  const removeKeyword = (keyword) => {
    setKeywords(keywords.filter((item) => item !== keyword));
  };

  const handleLogoutClick = () => {
    setShowOverlay(true);
  };

  const confirmLogout = () => {
    setShowOverlay(false);
    navigate('/signup'); 
  };

  const cancelLogout = () => {
    setShowOverlay(false);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Fixed Swiper Top Information Bar */}
      <div className="fixed top-0 left-0 right-0 bg-purple-900 text-white shadow-md z-40">
        <Slider {...settings}>
          <div className="p-4">
            <div className="container mx-auto flex justify-between items-center">
              <p>Welcome to the Website!</p>
              <button
                onClick={handleSignIn}
                className="bg-purple-200 text-purple-900 py-1 px-4 rounded-md hover:bg-purple-300 transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="container mx-auto text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                This website is created by Smith Boluwatife
              </motion.p>
            </div>
          </div>
          <div className="p-4">
            <div className="container mx-auto text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                The webpage is only for IFS students
              </motion.p>
            </div>
          </div>
        </Slider>
      </div>

      {/* Main content area with top padding */}
      <div className="flex-grow pt-24 p-6">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search School of Technology..."
            className="border border-gray-300 rounded-l-md px-4 py-2 w-full max-w-md focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-500 text-white px-4 py-2 rounded-r-md hover:bg-purple-600 transition-colors duration-200"
          >
            Search
          </button>
        </div>

        {loading ? (
          <Loader /> // Show loader while loading
        ) : (
          <div className="flex flex-wrap justify-center space-x-2 space-y-2">
            {keywords.map((keyword, index) => (
              <motion.div
                key={index}
                className="bg-purple-100 text-purple-900 px-4 py-2 rounded-md flex items-center space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span>{keyword}</span>
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="text-purple-900 hover:text-red-500 transition-colors duration-200"
                >
                  &times;
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Project />

      {/* Centered Bottom Navigation Bar */}
      <div className="fixed inset-x-0 bottom-8 flex justify-center z-40">
        <div className="bg-white shadow-lg rounded-full w-11/12 max-w-md p-4 flex justify-around items-center">
          <button
            onClick={() => handleNavigation('/', 'home')}
            className={`flex flex-col items-center ${
              activeTab === 'home' ? 'text-purple-500 scale-110' : 'text-gray-600'
            } transition-transform duration-200`}
          >
            <FaHome size={activeTab === 'home' ? 28 : 24} />
            <span className="text-sm">Home</span>
          </button>
          <button
            onClick={() => handleNavigation('/upload', 'upload')}
            className={`flex flex-col items-center ${
              activeTab === 'upload' ? 'text-purple-500 scale-110' : 'text-gray-600'
            } transition-transform duration-200`}
          >
            <FaUpload size={activeTab === 'upload' ? 28 : 24} />
            <span className="text-sm">Upload</span>
          </button>
          <button
            onClick={handleLogoutClick}
            className={`flex flex-col items-center ${
              activeTab === 'logout' ? 'text-purple-500 scale-110' : 'text-gray-600'
            } transition-transform duration-200`}
          >
            <FaSignOutAlt size={activeTab === 'logout' ? 28 : 24} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Overlay */}
      {showOverlay && (
        <Overlay onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </div>
  );
};

export default HomePage;
