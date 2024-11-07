import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <nav className="bg-white p-3 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <a href="/"><img src="/src/assets/logo.png" alt="Logo" className="h-12 w-30" /></a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-gray-600 hover:text-black">Home</a>
          <a href="/experiences" className="text-gray-600 hover:text-black">Experiences</a>
          <a href="/online_experiences" className="text-gray-600 hover:text-black">Online Experiences</a>
          <a href="/" className="text-gray-600 hover:text-black">Sign up</a>
          <a href="/" className="text-gray-600 hover:text-black">Login</a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white bg-red-400 focus:outline-none">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="/" className="block text-gray-600 hover:text-black p-2">Home</a>
          <a href="/experiences" className="block text-gray-600 hover:text-black p-2">Experiences</a>
          <a href="/online_experiences" className="block text-gray-600 hover:text-black p-2">Online Experiences</a>
          <a href="/" className="block text-gray-600 hover:text-black p-2">Sign up</a>
          <a href="/" className="block text-gray-600 hover:text-black p-2">Login</a>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
