import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostNavbar = ({ showListingsOptions = true}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white p-3 fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <a href="/hostHome">
              <img src="/src/assets/logo.png" alt="Logo" className="h-12 w-30" />
            </a>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {showListingsOptions && (
              <>
                <a href="/listings" className="text-gray-600 hover:text-black">
                  Listings
                </a>
                <a href="/bookings" className="text-gray-600 hover:text-black">
                  Bookings
                </a>
                <button
                  onClick={() => navigate("/addListing")}
                  className="m-2 px-6 py-1 bg-red-400 text-white rounded-lg p-0 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  + Add Listing
                </button>
              </>
            )}
            <button
              onClick={() => navigate("/profile")}
              className="text-gray-600 hover:text-black p-2 text-3xl hover:border-none focus:outline-none"
            >
              <i className="fa">&#xf2bd;</i>
            </button>
          </div>

          <div className="md:hidden">
            {showListingsOptions && (
              <button
                onClick={() => navigate("/addListing")}
                className="m-1 mr-2 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                + Add Listing
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="px-4 py-2 shadow-sm shadow-gray-400 text-black bg-white focus:outline-none hover:border-none hover:shadow-lg hover:shadow-gray-400"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden fixed top-[65px] z-10 bg-white w-full">
          {showListingsOptions && (
            <>
              <a
                href="/listings"
                className="text-lg block text-gray-600 hover:text-black hover:bg-red-100 p-2"
              >
                Listings
              </a>
              <a
                href="/bookings"
                className="text-lg block text-gray-600 hover:text-black hover:bg-red-100 p-2"
              >
                Bookings
              </a>
            </>
          )}
          <a
            href="/profile"
            className="text-lg block text-gray-600 hover:text-black hover:bg-red-100 p-2"
          >
            Profile
          </a>
        </div>
      )}
    </>
  );
};

export default HostNavbar;
