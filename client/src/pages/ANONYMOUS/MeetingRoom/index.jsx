import { Col, Row, Space } from "antd"
import { MeetingRoomContainerStyled } from "./styled"
import ListIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import ChatBox from "src/components/ChatBox"
import InputCustom from "src/components/InputCustom"
import { BiSolidSend } from "react-icons/bi"
import Peer from "peerjs"
import ReactPlayer from "react-player"


const MeetingRoom = () => {

  const { RoomID } = useParams()
  const [isShowChatbox, setIsShowChatbox] = useState(false)
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const [users, setUsers] = useState([])
  const [myID, setMyID] = useState()
  const [stream, setStream] = useState()
  const [pagination, setPagination] = useState({
    PageSize: 7,
    CurrentPage: 1,
  })

  useLayoutEffect(() => {
    initWebRTC()
  }, [])

  const initWebRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      setStream(stream)
      const peer = new Peer()
      peer.on("open", id => {
        setMyID(id)
      })
    } catch (error) {
      console.log("error", error.toString());
    }
  }

  return (
    <MeetingRoomContainerStyled>
      <Row>
        <Col span={18}>
          <Row className="left-screen">
            <Col span={24}>
              {
                !!myID && !!stream &&
                <div className="video-container">
                  <ReactPlayer
                    key={myID}
                    url={stream}
                    playing={true}
                  />
                </div>
              }
            </Col>
            <Col span={24} className="control">
              <div className="controller d-flex-center">
                <Space>
                  <ButtonCircle
                    className="primary"
                    mediumsize
                    icon={ListIcons.ICON_MIC}
                  />
                  <ButtonCircle
                    className="primary"
                    mediumsize
                    icon={ListIcons.ICON_CAMERA_VIDEO}
                  />
                  <ButtonCircle
                    className="primary"
                    mediumsize
                    icon={ListIcons.ICON_MESSAGE_DOT}
                  />
                  <ButtonCircle
                    className="red"
                    mediumsize
                    icon={ListIcons.ICON_TELEPHONE}
                  />
                </Space>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row className="right-screen">
            <Col span={24}>
              <div className="header">Trò chuyện</div>
            </Col>
            <Col span={24}>
              <div style={{ backgroundColor: "#dcdada" }}>
                <ChatBox
                  messages={messages}
                  total={total}
                  setPagination={setPagination}
                />
              </div>
            </Col>
          </Row>
          <div style={{ paddingRight: "16px" }}>
            <div className="input-message">
              <InputCustom
                placeholder="Nhập vào tin nhắn"
                suffix={
                  <BiSolidSend
                    className="cursor-pointer"
                    // onClick={() => {
                    //   if (!!content) {
                    //     setContent("")
                    //     handleSendMessage()
                    //   }
                    // }}
                    color="#106ebe"
                  />
                }
              />
            </div>
          </div>
        </Col>
      </Row>
    </MeetingRoomContainerStyled>
  )
}

export default MeetingRoom