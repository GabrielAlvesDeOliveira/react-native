import axios from 'axios'


const api = axios.create({
  baseURL: 'https://viacep.com/ws'
})

export default api