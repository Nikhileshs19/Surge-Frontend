import axios from "axios"

// env file
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})
