import axios from 'axios'

const instance = axios.create({
  // /api has to be added in to the route to allow host both front and back end using single nginx server in production environment
  baseURL:
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_APP_API_URL + '/api'
      : import.meta.env.VITE_APP_API_URL
})

export default instance
