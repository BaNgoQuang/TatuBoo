import { Col, Empty, Row } from "antd"
import { useEffect, useState } from "react"
import SpinCustom from "src/components/SpinCustom"
import MessageService from "src/services/MessageService"
import socket from "src/utils/socket"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import ChatBox from "src/components/ChatBox"
import InputCustom from "src/components/InputCustom"
import { BiSolidSend } from "react-icons/bi"
import { ChatBoxWrapper, MessageItemStyled } from "./styled"

const InboxManagement = () => {

  const { user } = useSelector(globalSelector)
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")
  const [pagination, setPagination] = useState({
    PageSize: 7,
    CurrentPage: 1,
    ChatID: ""
  })

  const getChatOfAdmin = async () => {
    try {
      setLoading(true)
      const res = await MessageService.getChatOfAdmin()
      if (res?.isError) return
      setChats(res?.data)
      setPagination(pre => ({ ...pre, ChatID: res?.data[0]?._id }))
    } finally {
      setLoading(false)
    }
  }

  const getListMessages = async () => {
    try {
      setLoading(true)
      const res = await MessageService.getMessageByChat({
        ...pagination,
      })
      if (res?.isError) return
      setMessages(res?.data?.List)
      setTotal(res?.data?.Total)
    } finally {
      setLoading(false)
    }
  }

  const seenMessage = async () => {
    try {
      setLoading(true)
      const res = await MessageService.seenMessage(pagination?.ChatID)
      if (res?.isError) return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getChatOfAdmin()
  }, [])

  useEffect(() => {
    if (!!pagination?.ChatID) {
      seenMessage()
      getListMessages()
    }
  }, [pagination])

  console.log(chats?.find(i => i?._id === pagination?.ChatID)?.Members?.find(item => item !== user?._id)?._id);

  const handleSendMessage = async () => {
    try {
      setLoading(true)
      const body = {
        Content: content,
        ChatID: pagination?.ChatID
      }
      const res = await MessageService.createMessage(body)
      if (res?.isError) return
      socket.emit("send-message", {
        ...body,
        Receiver: chats?.find(i => i?._id === pagination?.ChatID)?.Members?.find(item => item !== user?._id)?._id,
        Sender: {
          _id: user?._id,
          FullName: user?.FullName,
          AvatarPath: user?.AvatarPath
        },
        createdAt: Date.now
      })
      setMessages([...messages, {
        ...body,
        Receiver: chats?.find(i => i?._id === pagination?.ChatID)?.Members?.find(item => item !== user?._id)?._id,
        Sender: {
          _id: user?._id,
          FullName: user?.FullName,
          AvatarPath: user?.AvatarPath
        },
        createdAt: Date.now
      }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    socket.on("get-message", data => {
      setMessages([...messages, data])
      getChatOfAdmin()
    })
  }, [])

  return (
    <SpinCustom spinning={loading}>
      <Row gutter={[16, 8]}>
        <Col span={6}>
          <div className="blue-text fs-18 fw-700 mb-16">Danh sách tin nhắn</div>
          {
            !!chats?.length ?
              chats?.map((i, idx) =>
                <MessageItemStyled
                  key={idx}
                  onClick={() => {
                    if (i?._id !== pagination?.ChatID) {
                      setPagination(pre => ({ ...pre, ChatID: i?._id }))
                    }
                  }}
                >
                  <div className="d-flex">
                    <img
                      src={i?.Members[0]?.AvatarPath}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        marginRight: "12px"
                      }}
                    />
                    <div>
                      <div className="fw-600 fs-16">{i?.Members[0]?.FullName}</div>
                      <div className="gray-text">{i?.LastMessage}</div>
                    </div>
                  </div>
                </MessageItemStyled>
              )
              : <Empty description="Chưa có tin nhắn nào" />
          }
        </Col>
        <Col span={18}>
          <div className="blue-text fs-18 fw-700 mb-16">{messages[0]?.Sender?.FullName}</div>
          {
            !!chats?.length &&
            <ChatBoxWrapper>
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
                    if (!!content) {
                      setContent("")
                      handleSendMessage()
                    }
                  }}
                  suffix={
                    <BiSolidSend
                      className="cursor-pointer"
                      onClick={() => {
                        if (!!content) {
                          setContent("")
                          handleSendMessage()
                        }
                      }}
                      color="#106ebe"
                    />
                  }
                />
              </div>
            </ChatBoxWrapper>
          }
        </Col>
      </Row>
    </SpinCustom>
  )
}

export default InboxManagement