"use client";
import React from 'react';

const BackButton = ({ children, className }) => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button 
      onClick={handleClick}
      className={className || "bg-[#B99066] text-white px-8 py-4 rounded-lg shadow-lg font-inter font-semibold text-lg hover:bg-[#A67A5A] transition-colors duration-200"}
    >
      {children || "Retour"}
    </button>
  );
};

export default BackButton;


