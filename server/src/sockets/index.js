let userOnlines = []

const addUserOnline = (socket) => {
  return data => {
    const user = userOnlines.find(i => i.UserID === data)
    if (!user) {
      userOnlines.push({
        UserID: data,
        SocketID: socket.id
      })
    }
    console.log(userOnlines);
  }
}

const sendNotification = (socket) => {
  return data => {
    console.log(data);
    const user = userOnlines.find(i => i.UserID === data.Receiver)
    if (!!user) {
      socket.to(user.SocketID).emit('get-notification', data)
    }
  }
}

const sendComment = (io) => {
  return data => {
    io.to(data.RoomID).emit("get-comment", data)
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
  }
}

const leaveRoom = (socket) => {
  return data => {
    socket.leave(data)
  }
}

const sendMessage = (socket) => {
  return data => {
    const user = userOnlines.find(i => i.UserID === data.Receiver)
    if (!!user) {
      socket.to(user.SocketID).emit("get-message", data)
    }
  }
}

const userLogout = () => {
  return data => {
    const index = userOnlines.findIndex(i => i.UserID === data)
    userOnlines.splice(index, 1)
    console.log(userOnlines);
  }
}

const SocketService = {
  addUserOnline,
  sendNotification,
  sendComment,
  sendDeactiveAccount,
  joinRoom,
  leaveRoom,
  sendMessage,
  userLogout
}

export default SocketService
