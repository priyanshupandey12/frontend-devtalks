import React from "react";
import { Globe } from "lucide-react"; 

import { BASE_URL } from "../store/constant";

const GoogleAuthButton = ({ text = "Continue with Google" }) => {
  const handleGoogleAuth = () => {
    window.location.href = `${BASE_URL}/users/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2 px-4 rounded-lg border border-gray-300 shadow-md hover:shadow-lg hover:bg-gray-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
    >
    
      <Globe size={20} className="text-red-500" />
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default GoogleAuthButton;
