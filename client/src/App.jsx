import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './pages/Protect'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App