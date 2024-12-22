import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNo: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log(formData);
    try{
      const response = await axios.post("http://localhost:8880/api/auth/register",
        {
          username : formData.username,
          password : formData.password,
          email : formData.email,
          phoneNo :formData.phoneNo,
          role:formData.role,
        });
        console.log("signup resonse : ",response.data)
        if(response.data)
        {
          navigate("/login");
        }
      
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-300 to-red-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-sm mx-auto">
              <div className="text-red-400 mb-4 text-center flex items-center justify-center">
                <img
                  className="h-12 w-12 mr-4"
                  src="src/assets/page_icon.png"
                  alt="Logo"
                />
                <h1 className="text-2xl font-bold">Airbnb</h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500 placeholder-opacity-75 hover:bg-red-100"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
                    <i className="fa">&#xf007;</i>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500 placeholder-opacity-75 hover:bg-red-100"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
                    <i className="fa">&#xf023;</i>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500 placeholder-opacity-75 hover:bg-red-100"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
                    <i className="fa">&#xf0e0;</i>
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500 placeholder-opacity-75 hover:bg-red-100"
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">
                    <i className="fa">&#xf095;</i>
                  </span>
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === "user"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`p-2 px-12 md:px-16 rounded-lg ${formData.role === "user"
                          ? "bg-red-300 text-white"
                          : "bg-white text-gray-500 hover:bg-red-100"
                        } border cursor-pointer`}
                    >
                      <i className="fa p-1">&#xf2bd;</i>
                      <span>User</span>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="host"
                      checked={formData.role === "host"}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div
                      className={`p-2 px-12 md:px-16 rounded-lg ${formData.role === "host"
                          ? "bg-red-300 text-white"
                          : "bg-white text-gray-500 hover:bg-red-100"
                        } border cursor-pointer`}
                    >
                      <i className="fa p-1">&#xf015;</i>
                      <span>Host</span>
                    </div>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-400 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition duration-200"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="src/assets/bg_image1.png"
              alt="Signup background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
