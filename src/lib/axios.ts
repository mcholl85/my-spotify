import axios from 'axios'
import { BASE_API, TOKEN } from '../constants/api.constants'

const api = axios.create({
  baseURL: BASE_API,
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

export default api
