

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../assets/background.jpg'; // Adjust the path as necessary

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [universityname, setUniversityname] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/register`, {
        username, email, dob, universityname, password, cpassword
      });
      if (response.data.message === "Signup successful") {
        localStorage.setItem("email", email);
        navigate("/otp-verification");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Signup failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'universityname':
        setUniversityname(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'cpassword':
        setCpassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <section
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:bg-opacity-80 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Account
            </h1>
            <form onSubmit={handleSignup} className="space-y-4 md:space-y-6">
              <div className="flex">
                <i className="fas fa-user mr-2" style={{ fontSize: '24px', color: 'green' }}></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                  value={username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <i className="fas fa-envelope mr-2" style={{ fontSize: '24px', color: 'red' }}></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <i className="fas fa-calendar-alt mr-2" style={{ fontSize: '24px', color: 'cyan' }}></i>
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                  max={new Date().toISOString().split("T")[0]}
                  value={dob}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <i className="fas fa-university mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
                <input
                  type="text"
                  name="universityname"
                  placeholder="Studying"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                  value={universityname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <i className="fas fa-lock mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex">
                <i className="fas fa-lock mr-2" style={{ fontSize: '24px', color: 'black' }}></i>
                <input
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-2 border rounded-md focus:outline-green-600 focus:border-blue-500"
                  value={cpassword}
                  onChange={handleChange}
                />
              </div>
              {message && <p className="text-red-500">{message}</p>}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <i className="fas fa-user-plus"></i> REGISTER
              </button>
            </form>
            <Link to="/login" className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Log in</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
