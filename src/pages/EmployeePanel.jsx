import React, { useState } from 'react'
import WebcamCapture from '../shared/WebcamCapture.jsx'
import api from '../services/api.js'

export default function EmployeePanel() {
  const [image, setImage] = useState(null)
  const [coords, setCoords] = useState(null)
  const [status, setStatus] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const enableLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(
      pos => setCoords(pos.coords),
      () => alert('Location permission denied')
    )
  }

  const submitAttendance = async () => {
    if (!image || !coords) return alert('Take a photo and enable location first')
    try {
      const payload = {
        employee_id: 1,
        image_base64: image,
        check_in_latitude: coords.latitude,
        check_in_longitude: coords.longitude
      }
      const res = await api.post('/attendance', payload)
      setStatus(res.data?.message || 'Attendance submitted')
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setStatus('Error submitting attendance')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Employee - Mark Attendance</h2>
      <WebcamCapture onCapture={setImage} />
      <div className="flex gap-3 mt-4">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded"
          onClick={enableLocation}
          disabled={submitted}
        >
          Enable Location
        </button>
        <button
          className={`px-4 py-2 rounded text-white ${submitted ? 'bg-gray-400' : 'bg-green-600'}`}
          onClick={submitAttendance}
          disabled={submitted}
        >
          Submit Attendance
        </button>
      </div>

      {status && (
        <p className="mt-3 font-semibold bg-yellow-200 text-black p-2 rounded">
          {status}
        </p>
      )}
      {image && <img src={image} alt="captured" className="w-40 h-40 object-cover mt-4 rounded" />}
    </div>
  )
}
