import { io } from "socket.io-client"

const ReactAppRootAPI = import.meta.env.REACT_APP_ROOT_API

// const socket = io.connect("http://localhost:9999")

const socket = io(`${ReactAppRootAPI}`, {
  autoConnect: false
})

export default socket