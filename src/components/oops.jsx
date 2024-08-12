import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaHome, FaUpload, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { supabase } from '../supabaseClient';
import images from '../assets/renamed.jpg';

const Overlay = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <p className="text-lg font-medium mb-4">Are you sure you want to logout?</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Yes
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
        >
          No
        </button>
      </div>
    </div>
  </div>
);

const Oops = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown state

  const navigate = useNavigate();

  useEffect(() => {
    // Countdown timer logic
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate('/login');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleNavigation = (path, tabName) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setShowOverlay(true);
  };

  const confirmLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      setShowOverlay(false);
      navigate('/signup');
    }
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-xs mx-auto">
          <img
            src={images} // Use your imported image here
            alt="Unauthorized Access"
            className="mb-8"
          />
          <p className="text-xl text-center text-gray-800 mb-4">
            You are not authorized to access this page. Please log in.
          </p>
          <p className="text-center text-red-500 text-2xl font-bold">
            Redirecting in {countdown}...
          </p>
        </div>
      </div>

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

export default Oops;
