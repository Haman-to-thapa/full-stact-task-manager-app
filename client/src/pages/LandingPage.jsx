import React from 'react'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 drop-shadow-lg">
          Welcome to <span className="text-blue-600">Task Manager</span>!
        </h1>
        <p className="text-lg text-gray-600 mb-8 font-bold">
          Organize your work, boost your productivity, and never miss a task again.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default LandingPage