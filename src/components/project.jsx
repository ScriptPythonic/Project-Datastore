import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { supabase } from '../supabaseClient';

const ITEMS_PER_PAGE = 5;

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const staticExamples = [
    {
      id: 'static1',
      title: 'IFS Journaling Implementation',
      summary: 'A detailed proposal for implementing journaling in IFS to improve data integrity and recovery.',
      date: '2024-08-01',
      time: '10:00 AM',
      uploader: 'John Doe',
      verified: true,
    },
    {
      id: 'static2',
      title: 'IFS Compression Algorithms',
      summary: 'Analysis and comparison of various compression algorithms for optimizing storage in IFS.',
      date: '2024-08-05',
      time: '02:30 PM',
      uploader: 'Jane Smith',
      verified: false,
    },
    {
      id: 'static3',
      title: 'IFS Access Control List (ACL) Design',
      summary: 'Comprehensive design for implementing fine-grained access control lists in IFS.',
      date: '2024-08-10',
      time: '11:15 AM',
      uploader: 'Alice Johnson',
      verified: true,
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      try {
        const { data, count, error } = await supabase
          .from('documents')
          .select('*', { count: 'exact' })
          .eq('verified', true)
          .order('uploaded_at', { ascending: false })
          .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

        if (error) {
          console.error('Error fetching projects:', error.message);
          return;
        }

        if (!data) {
          console.warn('No data returned from Supabase');
          return;
        }

        // Log the fetched data for inspection
        console.log('Fetched projects:', data);
        console.log('Total Count:', count);

        setProjects(data);
        setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Unexpected error:', error.message);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

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

  const combinedProjects = [...staticExamples, ...projects];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Recent IFS Project Uploads</h2>

      {loadingProjects ? (
        <div className="space-y-6 mt-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Skeleton circle width={48} height={48} />
                  <div className="ml-4 flex-1">
                    <Skeleton width="60%" height={24} />
                    <Skeleton width="80%" height={16} />
                  </div>
                </div>
                <Skeleton count={3} />
                <Skeleton width="40%" height={20} className="mt-4" />
              </div>
              <div className="bg-gray-100 px-6 py-4">
                <Skeleton width="30%" height={24} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="space-y-6 mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {combinedProjects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden relative"
              variants={itemVariants}
            >
              <div className="absolute top-4 right-4">
                {project.file_url ? (
                  <Link to={`/project/${project.id}`}>
                    <FaExternalLinkAlt className="text-blue-600 text-xl hover:text-blue-800" />
                  </Link>
                ) : (
                  <FaExternalLinkAlt
                    className="text-blue-600 text-xl hover:text-blue-800 cursor-pointer"
                    onClick={() => console.log('Static project icon clicked')}
                  />
                )}
              </div>
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Project;
