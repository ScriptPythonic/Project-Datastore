// src/components/ProjectDetail.js
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { FaHome, FaUpload, FaSignOutAlt } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';



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





const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showOverlay, setShowOverlay] = useState(false); 
  const navigate = useNavigate()

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

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project detail:', error);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProjectDetail();
  }, [id]);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (!project) return <div className="text-center text-gray-600">Project not found</div>;

  return (
    <>
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
      <div className="max-w-4xl mx-auto p-4 mt-20">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Project Details</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <FaFilePdf className="text-red-500 text-4xl mr-4" />
              <div>
                <h3 className="text-3xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <p><span className="font-medium">Date:</span> {project.date}</p>
                  <p><span className="font-medium">Uploaded At:</span> {project.uploaded_at}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-4">
              {project.file_url ? (
                <motion.a
                  href={project.file_url}
                  download
                  className="text-blue-600 hover:text-blue-800 font-medium text-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Download PDF
                </motion.a>
              ) : (
                <p className="text-gray-600">No PDF available for download</p>
              )}
            </div>
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
    </>
  );
};

export default ProjectDetail;
