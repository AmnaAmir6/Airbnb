import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HostNavbar from "../components/HostNavbar";

const HostProfilePage = () => {
  const [hostData, setHostData] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchHostData = async () => {
      const username = localStorage.getItem("username");
      try {
        const response = await axios.get("http://localhost:8880/api/host/profile", {
          params: { username },
        });
        setHostData(response.data);
      } catch (error) {
        console.error("Error fetching host data", error);
      }
    };

    fetchHostData();
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login"); 
  };

  if (!hostData) {
    return <p>Loading...</p>;
  }

  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : "?";
  };

  return (
    <>
    <HostNavbar showListingsOptions={false} />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] md:w-[350px] text-center">

        <div className="flex items-center justify-center w-28 h-28 bg-black text-white text-6xl font-bold rounded-full mx-auto mb-2">
          {getInitial(hostData.username)}
        </div>

        <h2 className="text-xl  text-gray-800 mb-4">{role}</h2>

        <div className="text-left py-6">
        <p className="text-gray-600 mb-2">
          <strong>Username:</strong> {hostData.username}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Email:</strong> {hostData.email}
        </p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default HostProfilePage;
