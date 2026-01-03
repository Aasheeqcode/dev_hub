"use client"

import type React from "react"

import { useState } from "react"

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate fields
    const newErrors = {
      email: !formData.email,
      password: !formData.password,
    }

    setErrors(newErrors)

    if (!newErrors.email && !newErrors.password) {
      console.log(isSignIn ? "Sign in submitted:" : "Sign up submitted:", formData)
      // Handle signup/signin logic here
    }
  }

  const toggleForm = () => {
    setIsSignIn(!isSignIn)
    setErrors({ email: false, password: false })
    setFormData({ fullName: "", email: "", password: "" })
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left Side - Branding */}
      <div className="w-1/2 flex flex-col justify-center items-center text-white px-12">
        <h1 className="text-6xl font-bold mb-8">
          Dev<span className="text-blue-500">Hub</span>
        </h1>
        <p className="text-xl text-gray-400 text-center leading-relaxed">
          The ultimate community for developers to <br />
          <span className="text-blue-400">Code, Collaborate, and Compete.</span>
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-12 bg-slate-900/50">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-white mb-2">{isSignIn ? "Sign In" : "Create Account"}</h2>
          <p className="text-gray-400 mb-8">
            {isSignIn ? "Welcome back to DevHub." : "Join the DevHub community today."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input - Only show on signup */}
            {!isSignIn && (
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-600"
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
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-slate-600"
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-2">Email is required</p>}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.password ? "border-red-500 focus:border-red-500" : "border-slate-700 focus:border-slate-600"
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-2">Password is required</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors mt-8"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            {isSignIn ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-blue-500 hover:text-blue-400 font-semibold cursor-pointer bg-none border-none p-0"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleForm}
                  className="text-blue-500 hover:text-blue-400 font-semibold cursor-pointer bg-none border-none p-0"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
