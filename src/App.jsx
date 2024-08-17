// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/Homepage';
import UploadPage from './components/upload';
import ProtectedRoute from './components/Hooks/protectedroute';
import Oops from './components/oops';
import ProjectDetail from './components/ProjectDetail';
import { BounceLoader } from 'react-spinners'; // New loader import

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show the loader whenever the location changes
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000); 
    };

    handleRouteChange(); // Call when location changes
  }, [location]);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <BounceLoader color="#4A90E2" loading={loading} size={60} />
        </div>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/signup"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Signup />
              </motion.div>
            }
          />
          <Route
            path="/access-denied-please-login"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Oops />
              </motion.div>
            }
          />
          <Route
            path="/upload"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProtectedRoute />
                <UploadPage />
              </motion.div>
            }
          />
          <Route
            path="/project/:id"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProtectedRoute />
                <ProjectDetail />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
