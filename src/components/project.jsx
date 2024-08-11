import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf } from 'react-icons/fa';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex items-center space-x-2">
        <motion.div
          className="w-3 h-3 bg-purple-500 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
        <motion.div
          className="w-3 h-3 bg-purple-500 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-3 h-3 bg-purple-500 rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        />
        <span className="ml-2 text-purple-500 font-medium">Loading...</span>
      </div>
    </div>
  );
};

// Project Component
const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setProjects([
        {
          title: 'IFS Journaling Implementation',
          summary: 'A detailed proposal for implementing journaling in IFS to improve data integrity and recovery.',
          date: '2024-08-01',
          time: '10:00 AM',
          uploader: 'John Doe',
        },
        {
          title: 'IFS Compression Algorithms',
          summary: 'Analysis and comparison of various compression algorithms for optimizing storage in IFS.',
          date: '2024-08-05',
          time: '02:30 PM',
          uploader: 'Jane Smith',
        },
        {
          title: 'IFS Access Control List (ACL) Design',
          summary: 'Comprehensive design for implementing fine-grained access control lists in IFS.',
          date: '2024-08-10',
          time: '11:15 AM',
          uploader: 'Alice Johnson',
        }
      ]);
      setLoadingProjects(false);
    }, 2000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Recent IFS Project Uploads</h2>
      {loadingProjects ? (
        <div className="flex items-center justify-center h-80">
          <Loader />
        </div>
      ) : (
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              variants={itemVariants}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaFilePdf className="text-red-500 text-3xl mr-4" />
                  <h3 className="text-2xl font-semibold text-gray-800">{project.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{project.summary}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <p><span className="font-medium">Date:</span> {project.date}</p>
                  <p><span className="font-medium">Time:</span> {project.time}</p>
                  <p><span className="font-medium">Uploader:</span> {project.uploader}</p>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium">View Details</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Project;
