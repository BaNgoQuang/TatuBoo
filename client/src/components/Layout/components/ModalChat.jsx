import { FloatButton } from "antd"
import ListIcons from "src/components/ListIcons"
import logo from '/logo.png'
import { AiOutlineMinus } from "react-icons/ai"
import { useEffect, useState } from "react"
import { ChatBoxContainerStyled } from "../styled"
import InputCustom from "src/components/InputCustom"
import { BiSolidSend } from "react-icons/bi"
import SpinCustom from "src/components/SpinCustom"
import MessageService from "src/services/MessageService"
import socket from "src/utils/socket"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import ChatBox from "src/components/ChatBox"

const ModalChat = () => {

  const { user } = useSelector(globalSelector)
  const [openChatBox, setOpenChatBox] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chat, setChat] = useState()
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const [content, setContent] = useState("")
  const [pagination, setPagination] = useState({
    PageSize: 7,
    CurrentPage: 1,
  })

  const getChat = async () => {
    try {
      setLoading(true)
      const res = await MessageService.getChatWithUser()
      if (res?.isError) return
      setChat(res?.data)
    } finally {
      setLoading(false)
    }
  }

  const getListMessages = async () => {
    try {
      setLoading(true)
      const res = await MessageService.getMessageByChat({
        ...pagination,
        ChatID: !!chat ? chat?._id : undefined
      })
      if (res?.isError) return
      setMessages(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChat()
  }, [])
  useEffect(() => {
    if (!!chat) {
      getListMessages()
    }
  }, [pagination, chat])

  useEffect(() => {
    if (!!chat && !!openChatBox) {
      socket.emit("join-room", chat?._id)
    }
  }, [chat, openChatBox])

  const handleSendMessage = async () => {
    try {
      setLoading(true)
      const body = {
        Content: content,
        ChatID: !!chat ? chat?._id : undefined
      }
      const res = await MessageService.createMessage(body)
      if (res?.isError) return
      if (!chat) {
        socket.emit("join-room", res?.data?.Chat)
      }
      socket.emit("send-message", {
        ...body,
        ChatID: !!chat ? chat?._id : res?.data?.Chat,
        Sender: {
          _id: user?._id,
          FullName: user?.FullName,
          AvatarPath: user?.AvatarPath
        },
        createdAt: Date.now
      })
    } finally {
      setLoading(false)
    }
  }

  socket.on("get-message", data => {
    setMessages([...messages, data])
  })

  return (
    <FloatButton.Group
      open={openChatBox}
      trigger="click"
      type="primary"
      onClick={() => setOpenChatBox(!openChatBox)}
      icon={ListIcons.ICON_CHAT_DOT}
      style={{
        position: 'fixed',
      }}
    >
      <SpinCustom spinning={loading}>
        <ChatBoxContainerStyled>
          <div className="header d-flex-sb">
            <img
              className="cursor-pointer"
              src={logo}
              alt=""
              style={{ width: '20px', height: "30px" }}
            />
            <AiOutlineMinus
              onClick={() => setOpenChatBox(false)}
              className="cursor-pointer"
            />
          </div>
          <div className="messages">
            <ChatBox
              messages={messages}
              total={total}
              setPagination={setPagination}
            />
          </div>
          <div className="input-message">
            <InputCustom
              placeholder="Nhập vào tin nhắn"
              value={content}
              onChange={e => setContent(e.target.value)}
              onPressEnter={() => {
                setContent("")
                handleSendMessage()
              }}
              suffix={
                <BiSolidSend
                  className="cursor-pointer"
                  onClick={() => {
                    setContent("")
                    handleSendMessage()
                  }}
                  color="#106ebe"
                />
              }
            />
          </div>
        </ChatBoxContainerStyled>
      </SpinCustom>
    </FloatButton.Group>
  )
}

export default ModalChat
