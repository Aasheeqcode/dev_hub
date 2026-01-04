// src/pages/AuthPage.tsx (or wherever you keep this file)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [apiError, setApiError] = useState(""); // State for backend errors

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    setApiError("");
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    // 1. Client-side Validation
    const newErrors = {
      email: !formData.email,
      password: !formData.password,
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.password) return;

    // 2. Prepare API Request
    setIsLoading(true);
    
    // Determine Endpoint
    const endpoint = isSignIn 
      ? "http://localhost:5000/api/auth/login" 
      : "http://localhost:5000/api/auth/register";

    // specific payload based on mode
    const payload = isSignIn
      ? { email: formData.email, password: formData.password }
      : { 
          name: formData.fullName, // Mapping fullName to name (common backend convention)
          email: formData.email, 
          password: formData.password 
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // 3. Success Handling
      console.log("Auth Success:", data);
      
      // Save Token (Adjust 'token' key based on your actual backend response)
      if (data.token) {
        localStorage.setItem("token", data.token);
        
        // Optional: Save user info if needed
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }
      }

      // Redirect to Home
      navigate("/home");

    } catch (err: any) {
      console.error("Auth Error:", err);
      setApiError(err.message || "Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setErrors({ email: false, password: false });
    setApiError("");
    setFormData({ fullName: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center text-white px-12 relative overflow-hidden">
         {/* Optional: Add a subtle background gradient or pattern here */}
         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/20 z-0"></div>
         
         <div className="relative z-10 text-center">
            <h1 className="text-6xl font-bold mb-8">
            Dev<span className="text-blue-500">Hub</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
            The ultimate community for developers to <br />
            <span className="text-blue-400 font-medium">Code, Collaborate, and Compete.</span>
            </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-12 bg-slate-900/50">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-white mb-2">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-400 mb-8">
            {isSignIn ? "Please sign in to continue." : "Join the community today."}
          </p>

          {/* API Error Message */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input - Only show on signup */}
            {!isSignIn && (
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-all ${
                  errors.email 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-slate-700 focus:border-blue-500"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">Email is required</p>}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-all ${
                  errors.password 
                    ? "border-red-500 focus:border-red-500" 
                    : "border-slate-700 focus:border-blue-500"
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">Password is required</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-6 font-semibold rounded-lg transition-all 
                ${isLoading 
                  ? "bg-blue-500/50 cursor-not-allowed text-white/50" 
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                }`}
            >
              {isLoading 
                ? "Processing..." 
                : (isSignIn ? "Sign In" : "Sign Up")
              }
            </button>
          </form>

          {/* Toggle Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleForm}
                className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer ml-1 focus:outline-none"
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}