
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import EmployeePanel from './pages/EmployeePanel.jsx'
import HRPanel from './pages/HRPanel.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Attendance System</h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Employee</Link>
            <Link to="/hr" className="hover:underline">HR Panel</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<EmployeePanel />} />
          <Route path="/hr" element={<HRPanel />} />
        </Routes>
      </main>

      <footer className="bg-gray-100 text-center py-4">
        <small>Built with React + Tailwind</small>
      </footer>
    </div>
  )
}
