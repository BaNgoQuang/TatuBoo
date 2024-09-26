import { io } from "socket.io-client"

const ReactAppRootAPILocal = import.meta.env.VITE_ROOT_API_LOCAL
const ReactAppRootAPICloud = import.meta.env.VITE_ROOT_API_CLOUD

<<<<<<< HEAD
// const socket = io.connect("http://localhost:9999")

const socket = io(`${ReactAppRootAPICloud}`, {
=======
const socket = io(`${ReactAppRootAPILocal}`, {
>>>>>>> 2dc289b2de21e9c58e9bea84532c81676e2d698b
  autoConnect: false
})

export default socket
