const sendNotification = (io) => {
  return (data) => {
    io.sockets.emit('get-notification', data)
  }
}

const sendComment = (io) => {
  return (data) => {
    io.sockets.emit('get-comments', data)
  }
}

const sendDeactiveAccount = (io) => {
  return (data) => {
    io.sockets.emit('get-deactive', data)
  }
}


const SocketService = {
  sendNotification,
  sendComment,
  sendDeactiveAccount
}

export default SocketService
