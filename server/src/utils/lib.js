export const response = (data, isError, msg, statusCode) => {
  return { data, isError, msg, statusCode }
}

export const Roles = {
  ROLE_ADMIN: 1,
  ROLE_STAFF: 2,
  ROLE_TEACHER: 3,
  ROLE_STUDENT: 4,
}

export const getRegexEmail = () => {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  return regex
}

export const getRegexPassword = () => {
  const regex = /^[A-Z][a-zA-Z0-9]{5,}$/
  return regex
}

export const optionSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaTuBoo',
      version: '1.0.0',
      description: 'TaTuBoo covered Create, Read, Update, and Delete operations using a Node.js API',
    },
    // components: {
    //   securitySchemas: {
    //     bearerAuth: {
    //       type: "http",
    //       schema: "bearer",
    //       bearerFormat: "JWT"
    //     }
    //   }
    // },
    // security: [
    //   {
    //     bearerAuth: []
    //   }
    // ],
    servers: [
      { url: 'http://localhost:9999' },
    ],
  },
  apis: ['./src/routes/*.route.js', "./src/models/*.js"],
}

// ------------------------------------
// Tài liệu để group socket id
// https://socket.io/docs/v4/emit-cheatsheet/
//Phòng:https://stackoverflow.com/questions/47352134/socket-io-handle-two-different-user-types

// // Thêm ổ cắm vào phòng
// socket.join('một số phòng');

// // Xóa ổ cắm khỏi phòng
// socket.leave('một số phòng');

// // Gửi tới khách hàng hiện tại
// socket.emit('message', 'đây là bản thử nghiệm');

// // Gửi tới tất cả khách hàng bao gồm người gửi
// io.sockets.emit('message', 'đây là bản thử nghiệm');

// // Gửi tới tất cả khách hàng ngoại trừ người gửi
// socket.broadcast.emit('message', 'đây là bản thử nghiệm');

// // Gửi tới tất cả khách hàng trong phòng (kênh) 'trò chơi' ngoại trừ người gửi
// socket.broadcast.to('game').emit('message', 'đây là bản thử nghiệm');

// // Gửi tới tất cả khách hàng trong phòng (kênh) 'trò chơi' bao gồm người gửi
// io.sockets.in('game').emit('message', 'đây là bản thử nghiệm');

// // Gửi tới id ổ cắm riêng lẻ
// io.sockets.socket(socketId).emit('message', 'đây là bản thử nghiệm');
