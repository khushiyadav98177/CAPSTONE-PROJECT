import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
  const baseStyles = "relative flex items-center justify-center font-bold py-2 px-6 rounded-md transition-all duration-300 backdrop-blur-md overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-playfix-red to-purple-600 text-white hover:from-playfix-red-hover hover:to-purple-500 shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)]",
    secondary: "bg-gray-500/40 border border-gray-400/30 text-white hover:bg-gray-500/60 shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    outline: "border-2 border-playfix-red text-playfix-red hover:bg-gradient-to-r hover:from-playfix-red hover:to-purple-600 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10 flex items-center">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-white opacity-0"
        whileTap={{ opacity: 0.2 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default Button;
