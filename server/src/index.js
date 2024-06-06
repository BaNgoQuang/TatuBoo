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
import SocketService from "./sockets/index.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: "http://localhost:5173" })

connect()

app.use(cors({
  origin: true,
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

io.on("connection", (socket) => {

  console.log(`người dùng ${socket.id} đã kết nối`)

  socket.on('send-comment', SocketService.sendComment(io))

  socket.on('send-deactive', SocketService.sendDeactiveAccount(io))

  socket.on('send-notification', SocketService.sendNotification(io))

  socket.on('disconnect', () => {
    console.log(`người dùng ${socket.id} đã ngắt kết nối`)
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
