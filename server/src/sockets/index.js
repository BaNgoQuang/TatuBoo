let userOnlines = []
let admin

const addUserOnline = (socket) => {
  return data => {
    const user = userOnlines.find(i => i.UserID === data)
    if (!user) {
      userOnlines.push({
        UserID: data,
        SocketID: socket.id
      })
    }
    console.log("userOnlines", userOnlines);
  }
}

const adminLogin = (socket) => {
  return data => {
    admin = {
      AdminID: data,
      SocketID: socket.id
    }
    console.log("admin", admin);
  }
}

const sendNotification = (socket) => {
  return data => {
    if (!!admin) {
      socket.to(admin.SocketID).emit('get-notification', data)
    }
  }
}

const sendComment = (socket) => {
  return data => {
    // const room = socket.rooms.find(i => )
  }
}

const sendDeactiveAccount = (socket) => {
  return data => {
    // io.sockets.emit('get-deactive', data)
  }
}

const joinRoom = (socket) => {
  return data => {
    socket.join(data)
    console.log(socket.rooms);
  }
}

const sendMessage = (socket) => {
  return data => {
    if (data.ReceiverID === admin.AdminID) {
      socket.to(admin.SocketID).emit("get-message", data)
    } else {
      const user = userOnlines.find(i => i.UserID === data.ReceiverID)
      if (!!user) {
        socket.to(user.SocketID).emit("get-message", data)
      }
    }
  }
}

const SocketService = {
  addUserOnline,
  adminLogin,
  sendNotification,
  sendComment,
  sendDeactiveAccount,
  joinRoom,
  sendMessage
}

export default SocketService
