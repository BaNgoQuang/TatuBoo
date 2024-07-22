import { io } from "socket.io-client"

const ReactAppRootAPILocal = import.meta.env.VITE_ROOT_API_LOCAL
const ReactAppRootAPICloud = import.meta.env.VITE_ROOT_API_CLOUD

// const socket = io.connect("http://localhost:9999")

const socket = io(`${ReactAppRootAPICloud}`, {
  autoConnect: false,
  forceNew: true,
  origins: ReactAppRootAPICloud
})

export default socket