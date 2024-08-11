import { motion } from 'framer-motion';

const Overlay = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg text-center"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: '0%', opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.5, type: 'tween' }}
    >
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
    </motion.div>
  </div>
);

export default Overlay;
