import { useState } from 'react';
import { FaHome, FaUpload, FaSignOutAlt, FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Project from './project'; 
import { supabase } from '../supabaseClient';

// Overlay Component
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

const UploadPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path, tabName) => {
    setActiveTab(tabName);
    navigate(path);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert('Please fill in all fields and select a file.');
      return;
    }
  
    setUploading(true);
  
    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('scriptpythonic')
        .upload(`uploads/${file.name}`, file);
  
      if (uploadError) {
        throw new Error(`File upload failed: ${uploadError.message}`);
      }
  
      // Get public URL of the uploaded file
      const { data } = supabase.storage
        .from('scriptpythonic')
        .getPublicUrl(`uploads/${file.name}`);
  
      if (!data || !data.publicUrl) {
        throw new Error('Failed to get public URL');
      }
  
      // Get current date
      const currentDate = new Date().toISOString();
  
      // Insert file metadata into Supabase table
      const { error: dbError } = await supabase
        .from('documents')
        .insert([
          {
            title: title,
            description: description,
            file_url: data.publicUrl,
            verified: false,
            uploaded_at: currentDate,
            date: currentDate, // Add this line to include the date
          },
        ]);
  
      if (dbError) {
        throw new Error(`Failed to save file data: ${dbError.message}`);
      }
  
      alert('File uploaded successfully!');
      setFile(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
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
      {/* Fixed Swiper Top Information Bar */}
      <div className="fixed top-0 left-0 right-0 bg-purple-900 text-white shadow-md z-40">
        <Slider {...settings}>
          <div className="p-4">
            <div className="container mx-auto flex justify-between items-center">
              <p>Welcome to the Website!</p>
              <button
                onClick={() => navigate('/login')}
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
        <div className="flex flex-col items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <label
              htmlFor="doc"
              className="flex items-center p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer mb-4"
            >
              <FaFilePdf />
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-gray-700">Upload a file</h4>
                <span className="text-sm text-gray-500">Max 2 MB</span>
              </div>
              <input
                type="file"
                id="doc"
                name="doc"
                accept=".docx,.pdf"
                onChange={handleFileChange}
                hidden
              />
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
            />
            <button
              onClick={handleUpload}
              className={`bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-200 ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
        <Project />
      </div>

      {/* Centered Bottom Navigation Bar */}
      <div className="fixed inset-x-0 bottom-8 flex justify-center z-40">
        <div className="bg-white shadow-lg rounded-full w-11/12 max-w-md p-4 flex justify-around items-center">
          <button
            onClick={() => handleNavigation('/', 'home')}
            className={`flex flex-col items-center ${activeTab === 'home' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <FaHome size={24} />
            <span className="text-sm">Home</span>
          </button>
          <button
            onClick={() => handleNavigation('/upload', 'upload')}
            className={`flex flex-col items-center ${activeTab === 'upload' ? 'text-purple-500' : 'text-gray-500'}`}
          >
            <FaUpload size={24} />
            <span className="text-sm">Upload</span>
          </button>
          <button
            onClick={handleLogoutClick}
            className="flex flex-col items-center text-gray-500"
          >
            <FaSignOutAlt size={24} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for Logout Confirmation */}
      {showOverlay && <Overlay onConfirm={confirmLogout} onCancel={cancelLogout} />}
    </div>
  );
};

export default UploadPage;
