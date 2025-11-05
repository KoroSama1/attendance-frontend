
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://attendance-backend-6i1v.onrender.com', // change if your backend is elsewhere
  headers: { 'Content-Type': 'application/json' }
})

export default api
