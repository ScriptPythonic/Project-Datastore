import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaHome, FaUpload, FaSignOutAlt, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from './div_loader'; 
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { supabase } from '../supabaseClient';
import Project from './project'

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

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleNavigation = (path, tabName) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .or(`title.ilike.%${searchInput}%,description.ilike.%${searchInput}%`);

      if (error) {
        console.error('Error searching projects:', error.message);
      } else {
        setSearchResults(data);
        console.log('Search Results:', data);
      }
    } catch (error) {
      console.error('Unexpected error during search:', error.message);
    } finally {
      setLoading(false);
    }
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
          <Loader />
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <FaFilePdf className="text-red-500 text-3xl mr-4" />
                    <h3 className="text-2xl font-semibold text-gray-800">{project.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description || project.summary}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <p><span className="font-medium">Date:</span> {project.date}</p>
                    <p><span className="font-medium">Time:</span> {project.time || project.uploaded_at}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="text-purple-600 hover:text-purple-800 font-medium mt-4"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No projects found</div>
        )}
      </div>

      {searchResults.length === 0 && <Project />}

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

      {showOverlay && (
        <Overlay onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </div>
  );
};

export default HomePage;
