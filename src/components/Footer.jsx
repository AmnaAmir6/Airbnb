import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-white text-red-600 p-6 mt-6 border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-4">
          <a href="/support" className="hover:text-red-800 text-red-600">Support</a>
          <a href="/community" className="hover:text-red-800 text-red-600">Community</a>
          <a href="/hosting" className="hover:text-red-800 text-red-600">Hosting</a>
          <a href="/about" className="hover:text-red-800 text-red-600">About</a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com/airbnb" target="_blank">
            <FaFacebook className="hover:text-red-800 text-red-600" />
          </a>
          <a href="https://twitter.com/airbnb" target="_blank">
            <FaTwitter className="hover:text-red-800 text-red-600" />
          </a>
          <a href="https://www.instagram.com/airbnb" target="_blank">
            <FaInstagram className="hover:text-red-800 text-red-600" />
          </a>
          
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm">© 2024 Airbnb. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
