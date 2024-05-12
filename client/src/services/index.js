import axios from 'axios'

const ReactAppRootAPI = import.meta.env.REACT_APP_ROOT_API

const parseBody = (response) => {
  const resData = response.data
  return resData
}

const instance = axios.create({
  timeout: 60000
})

instance.interceptors.request.use(
  config => {
    config.baseURL = ReactAppRootAPI
    return config
  },
  error => Promise.reject(error.message)
)

instance.interceptors.response.use(
  response => parseBody(response),
  error => Promise.reject(error.message)
)

export default instance
