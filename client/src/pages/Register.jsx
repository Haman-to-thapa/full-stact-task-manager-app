import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { usetAuth } from '../context/AuthContext';

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = usetAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post('https://full-stact-task-manager-app.onrender.com/register', {
        fullName,
        email,
        password
      })
      login(res.data.user, res.data.token)
      navigate("/dashboard");

    } catch (error) {
      setError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'>
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md">
        <h2 className='text-3xl font-extrabold text-gray-800 mb-6 text-center drop-shadow-lg'>Register for <span className='text-blue-600'>Task Manager</span></h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-4 py-2 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className="">
            <input type="text"
              placeholder='Full Name'
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register