import axios from 'axios'
const api = axios.create({ baseURL: 'https://dummyjson.com' })
export const login = (username, password) => api.post('/auth/login', { username, password })
export const listUsers = (page=1, perPage=5) => {
  const skip = (page-1)*perPage
  return api.get('/users', { params:{ limit:perPage, skip } })
}
export const getUser = (id) => api.get(`/users/${id}`)
export const updateUser = (id, payload) => api.put(`/users/${id}`, payload)
export const deleteUser = (id) => api.delete(`/users/${id}`)
export default api
