import express from "express"
import http from "http"
import { Server } from 'socket.io'
import * as dotenv from 'dotenv'
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { rateLimit } from "express-rate-limit"
import compression from "compression"
dotenv.config()
import cors from 'cors'
import connect from './config/index.js'
import routes from './routes/index.js'
import { optionSwagger } from "./utils/lib.js"
import SocketService, { userOnlines } from "./sockets/index.js"
import schedule from "node-schedule"
import getListPaymentInCurrentWeek from "./tools/getListPaymentInCurrentWeek.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: process.env.CLIENT_URL_LOCAL })

connect()

app.use(cors({
  origin: process.env.CLIENT_URL_LOCAL,
  credentials: true,
}))

app.use(compression())

app.use(helmet())

app.use(cookieParser())

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
}))

app.use(express.json())

routes(app)

// đặt lịch tự động gọi hàm lấy danh sách payment cho giáo viên trong tuần
// đang sửa thành t6 để test hoạt động 
schedule.scheduleJob('0 23 * * 0', () => {
  getListPaymentInCurrentWeek()
})

io.on("connection", (socket) => {

  console.log(`người dùng ${socket.id} đã kết nối`)

  socket.on("add-user-online", SocketService.addUserOnline(socket))

  socket.on('send-notification', SocketService.sendNotification(socket))

  socket.on('send-comment', SocketService.sendComment(io))

  socket.on('send-deactive', SocketService.sendDeactiveAccount(socket))

  socket.on("join-room", SocketService.joinRoom(socket))

  socket.on("leave-room", SocketService.leaveRoom(socket))

  socket.on("send-message", SocketService.sendMessage(socket))

  socket.on("user-logout", SocketService.userLogout())

  socket.on("join-meeting-room", SocketService.joinMeetingRoom(socket))

  socket.on("toggle-handler", SocketService.toggleHandler(io))

  socket.on("inactive-account", SocketService.inactiveAccount(socket))

  socket.on("leave-meeting-room", SocketService.leaveMeetingRoom(socket))

  socket.on("send-message-meeting-room", SocketService.sendMessageMeetingRoom(io))

  socket.on('disconnect', () => {
    console.log(`người dùng ${socket.id} đã ngắt kết nối`)
    const index = userOnlines.findIndex(i => i.SocketID === socket.id)
    userOnlines.splice(index, 1)
    console.log(userOnlines)
  })
})

const spacs = swaggerjsdoc(optionSwagger)
app.use("/api-docs",
  swaggerui.serve,
  swaggerui.setup(spacs)
)

server.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
