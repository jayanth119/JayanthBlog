import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
function PortfolioPage() {


  

  return (
    <div className="dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full flex justify-between px-6 py-4 bg-gray-800 text-white shadow-md">
        <div className="text-2xl font-bold">Portifolio</div>
        <ul className="hidden md:flex space-x-6">
          {[ 'Eduction' , "Skills", "Projects", "Experience",  "Contact",  'Resume' ].map((item) => (
            <li key={item} className="cursor-pointer hover:text-gray-400">
              <Link to={item.toLowerCase()} smooth={true} duration={500}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center px-4"
      >
        <h1 className="text-5xl font-bold">Jayanth Chukka </h1>
        <div className="flex mt-6 space-x-4">
          <a href="https://www.linkedin.com/in/jayanth-ch-374550253/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} className="hover:text-blue-500" />
          </a>
          <a href="https://github.com/jayanth119" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} className="hover:text-gray-500" />
          </a>
          <a href="mailto:chjayanth119@gmail.com">
            <FaEnvelope size={30} className="hover:text-red-500" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default PortfolioPage;
