// src/components/ScatterBoxLoaderComponent.jsx
import { ScatterBoxLoader } from "react-awesome-loaders";

export const ScatterBoxLoaderComponent = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <ScatterBoxLoader primaryColor="#6366F1" background="#f0f0f0" />
    </div>
  );
};
