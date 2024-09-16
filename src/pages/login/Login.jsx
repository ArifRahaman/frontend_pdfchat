import React, { useState,useContext } from 'react';
import  app from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider(app);
const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "${import.meta.env.VITE_BACKEND_DOMAIN}/login", // Make sure the port is correct
  //       { email, password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     if (response.data.message === "OTP sent to your email") {
  //       localStorage.setItem("email", email);
  //       navigate("/otp-verification");
  //     } 
  //     else if (response.status === 401 || response.data.message ==="The password is incorrect"){
  //       setMessage("Incorrect Password");
  //     }
  //     else {
  //       setMessage(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setMessage("Login failed. Please try again.");
  //   }
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "${import.meta.env.VITE_BACKEND_DOMAIN}/login", // Make sure the port is correct
  //       { email, password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     if (response.data.message === "OTP sent to your email") {
  //       localStorage.setItem("email", email);
  //       navigate("/otp-verification");
  //     } else if (response.status === 401) {
  //       setMessage("Incorrect password. Please try again."); // Example error message
  //     } else {
  //       setMessage(response.data.message || "An error occurred during login."); // Handle unexpected messages
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setMessage("Login failed. Please try again."); // Generic error message
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/login`, // Ensure the port is correct
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Handle the OTP sent response
      if (response.data.message === "OTP sent to your email") {
        localStorage.setItem("email", email);
        navigate("/otp-verification");
      } else {
        setMessage(response.data.message || "An error occurred during login.");
      }
    } catch (error) {
      // Handle errors here
      if (error.response) {
        // Errors from server
        if (error.response.status === 401) {
          setMessage("Incorrect password. Please try again.");
        } else if (error.response.status === 404) {
          setMessage("No record found. Please check your email.");
        } else {
          setMessage(error.response.data.message || "An error occurred during login.");
        }
      } else {
        // Network or other errors
        console.error("Login error:", error);
        setMessage("Login failed. Please try again.");
      }
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-gray-500">
                I accept the <a className="font-medium text-indigo-600 hover:underline" href="#">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
          {message && <p className="text-red-500">{message}</p>}
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </Link>
        </p>
      </div>
 <div>

 </div>
    </div>
  );
};

export default Login;
