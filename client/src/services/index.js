import axios from 'axios'

const ReactAppRootAPILocal = import.meta.env.VITE_ROOT_API_LOCAL
const ReactAppRootAPICloud = import.meta.env.VITE_ROOT_API_CLOUD

const parseBody = (response) => {
  const resData = response.data
  return resData
}

const instance = axios.create({
  timeout: 60000
})

instance.interceptors.request.use(
  config => {
    config.baseURL = ReactAppRootAPILocal
    config.withCredentials = true
    return config
  },
  error => Promise.reject(error.message)
)

instance.interceptors.response.use(
  response => parseBody(response),
  error => Promise.reject(error.message)
)

export default instance
