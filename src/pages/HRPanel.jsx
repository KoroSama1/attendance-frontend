
import React, { useEffect, useState } from 'react'
import api from '../services/api.js'

export default function HRPanel() {
  const [attendance, setAttendance] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [locations,setLocations] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/attendance')
        const data = res.data || []
        setAttendance(data)

        //Fetching location names
        const locationPromises = data.map(async (a)=>{
          if(a.check_in_latitude && a.check_in_longitude){
            const lat = a.check_in_latitude
            const lon = a.check_in_longitude
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            )
            const json = await response.json()
            return {
              id: a.attendance_id,
              name:
                // json.address?.amenity ||
                // json.address?.attraction ||
                // json.address?.building ||
                // json.name ||
                json.display_name || 
                'Unknown location',
            }
          }
          return {id:a.attendance_id, name:'Unknown Location'}
        })

        const resolved = await Promise.all(locationPromises)

        const locationMap={}
        resolved.forEach((loc) => {
          locationMap[loc.id] = loc.name
        })
        setLocations(locationMap)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  const formatDate = (d) => new Date(d).toLocaleDateString()
  const formatTime = (t) => new Date(t).toLocaleTimeString()

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">HR - Attendance Overview</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Check-in</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">On Site</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a, i) => (
              <tr key={i} className="text-center">
                <td className="border px-4 py-2">{a.employee_id}</td>
                <td className="border px-4 py-2">{new Date(a.attendance_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(a.check_in_time).toLocaleTimeString()}</td>
                <td className="border px-4 py-2">
                  <img
                    src={`http://localhost:5000${a.image_path}`}
                    alt="Employee"
                    className="w-16 h-16 object-cover mx-auto rounded"
                    onClick={()=> setSelectedImage(`http://localhost:5000${a.image_path}`)}
                  />
                </td>
                <td className="border px-4 py-2 break-words whitespace-normal max-w-xs">
                  {locations[a.attendance_id] || 'Fetching...'}
                </td>
                <td className="border px-4 py-2">{a.is_on_site ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
             onClick={()=> setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Zoomed"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
