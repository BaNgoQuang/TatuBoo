export let userOnlines = []
export let userInMeetingRoom = {}

const addUserOnline = (socket) => {
  return data => {
    if (!!data) {
      const user = userOnlines.find(i => i.UserID === data)
      if (!user) {
        userOnlines.push({
          UserID: data,
          SocketID: socket.id
        })
      }
    }
    console.log("userOnlines", userOnlines)
  }
}

const sendNotification = (socket) => {
  return data => {
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
    console.log("userOnlines", userOnlines)
  }
}

const joinMeetingRoom = (io, socket) => {
  return data => {
    console.log("data.Stream", data.Stream);
    userInMeetingRoom = {
      ...userInMeetingRoom,
      [data.RoomID]: {
        ...userInMeetingRoom[data.RoomID],
        [data.PeerID]: {
          stream: data.Stream,
          playing: data.Playing,
          muted: data.Muted
        }
      }
    }
    socket.join(data.RoomID)
    io.to(data.RoomID).emit("user-connected-meeting-room", {
      PeerID: data.PeerID,
      Stream: data.Stream,
      Playing: data.Playing,
      Muted: data.Muted
    })
    console.log("userInMeetingRoom", userInMeetingRoom);
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
  userLogout,
  joinMeetingRoom
}

export default SocketService
