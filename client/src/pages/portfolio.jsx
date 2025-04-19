import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope , FaBars , FaTimes  } from "react-icons/fa";
function PortfolioPage() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);
  const navItems = ["Eduction", "Skills", "Projects", "Experience", "Contact", "Resume"];

  return (
    <div className="dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md z-10" >
        <div className="text-2xl font-bold">Portifolio</div>
        {/* Desktop view  */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item} className="cursor-pointer hover:text-gray-400">
              <Link to={item.toLowerCase()} smooth={true} duration={500}>
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden z-20" onClick={toggleNav}>
          {navOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>
        {/* Mobile Nav Menu */}
        {navOpen && (
          <ul className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center space-y-6 py-6 md:hidden transition-all duration-300">
            {navItems.map((item) => (
              <li key={item} className="text-lg cursor-pointer hover:text-gray-400">
                <Link to={item.toLowerCase()} onClick={() => setNavOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        )}
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
