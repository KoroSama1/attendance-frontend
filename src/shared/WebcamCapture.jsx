
import React, { useRef } from 'react'
import Webcam from 'react-webcam'

export default function WebcamCapture({ onCapture }) {
  const ref = useRef(null)
  const videoConstraints = { facingMode: 'environment' }

  const capture = () => {
    const img = ref.current.getScreenshot()
    if (img) onCapture(img)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-gray-100 rounded overflow-hidden">
        <Webcam
          audio={false}
          ref={ref}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-64 object-cover"
        />
      </div>
      <button onClick={capture} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Capture Photo</button>
    </div>
  )
}
