import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '/src/store/AuthStore'

const LoginPage = () => {
  const { setUser, setRole } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      console.log(formData);
      const response = await axios.post("http://localhost:8880/api/auth/login",
        {
          username : formData.username,
          password : formData.password,
          role:formData.role,
        });
        console.log("login resonse : ",response.data)
        if(response.data)
        {
          console.log("user :".response.data.user)
          setUser(response.data.user);
          setRole(formData.role);
          if(role == 'user')
          {
            navigate("/");
          }
          else{
            navigate("/hostHome");
          }
        }
        
      
    }
    catch(error){
      console.log(error);
    }
    
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-300 to-red-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-sm mx-auto">
              <div className="text-red-400 mb-8 text-center flex items-center justify-center">
                <img
                  className="h-12 w-12 mr-4"
                  src="src/assets/page_icon.png"
                  alt="Logo"
                />
                <h1 className="text-2xl font-bold">Airbnb</h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  
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
                </div>
                <div>
                  
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


                </div>

                <div className="mb-4">
                  <div className="flex justify-center items-center space-x-4">
                    <label className="flex items-center ">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={formData.role === 'user'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div
                        className={`p-1 px-12 md:px-14 rounded-lg ${formData.role === 'user' ? 'bg-red-300 text-white' : 'bg-white text-gray-500  hover:bg-red-100'
                          } border cursor-pointer`}
                      >
                        <i className="fa p-1">&#xf2bd;</i>
                        <span>User</span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="role"
                        value="host"
                        checked={formData.role === 'host'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <div
                        className={`p-1 px-12 md:px-14 rounded-lg ${formData.role === 'host' ? 'bg-red-300 text-white' : 'bg-white text-gray-500 hover:bg-red-100'
                          } border cursor-pointer`}
                      >
                        <i className="fa p-1">&#xf015;</i>
                        <span>Host</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/*<div className="mt-[2px] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-red-400 hover:underline hover:border-none"
                  >
                    Forgot Password?
                  </button>
                </div>*/}
                <button
                  type="submit"
                  className="w-full bg-red-400 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition duration-200"
                >
                  Login
                </button>
              </form>
              <div className="text-center">
                <p className="text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    onClick={handleSignupRedirect}
                    className="text-red-400 font-semibold hover:underline hover:border-none"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="src/assets/bg_image2.png"
              alt="Login background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
