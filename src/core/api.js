import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.1.173:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default api