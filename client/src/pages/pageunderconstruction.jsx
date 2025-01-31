import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Floating Astronaut */}
      {/* <motion.img
        src="https://media.istockphoto.com/id/1410787752/photo/astronaut-floating-in-space-near-earth-and-moon.jpg?s=1024x1024&w=is&k=20&c=kZielBfVNh71zENF-RkCDkLbOoE2w09uc6g751CQuKc="
        alt="Astronaut"
        // className="w-48 h-48 mb-8"
        // animate={{ y: [0, -10, 0] }}
        // transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      {/* Error Message */}
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="text-lg text-gray-400 mt-4">Oops! Looks like you’re lost in space.</p>

      {/* CTA Button */}
      <Link to="/" className="mt-6 px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-500 transition">
        Take Me Home 🏠
      </Link>
    </div>
  );
};

export default NotFound;
