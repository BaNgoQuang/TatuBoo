import { Col, Row, Space } from "antd"
import { MeetingRoomContainerStyled } from "./styled"
import ListIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import ChatBox from "src/components/ChatBox"
import InputCustom from "src/components/InputCustom"
import { BiSolidSend } from "react-icons/bi"
import SimplePeer from "simple-peer"


const MeetingRoom = () => {

  const { RoomID } = useParams()
  const [isShowChatbox, setIsShowChatbox] = useState(false)
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const [users, setUsers] = useState([])
  const peerRef = useRef(null)
  const [pagination, setPagination] = useState({
    PageSize: 7,
    CurrentPage: 1,
  })

  useEffect(() => {
    initWebRTC()
  }, [])

  const initWebRTC = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: !!devices.some(device => device.kind === 'videoinput') ? true : false
      })
      const peer = new SimplePeer({
        initiator: !users?.length ? true : false,
        trickle: false,
        stream: !!devices.some(device => device.kind === 'videoinput') ? stream : false
      })
      peer.on("signal", data => {
        if (!!users?.length) {
          peerRef.current = data
        }
      })
      peer.on("connect", () => {
        console.log("connect")
      })
      peer.on("stream", stream => {
        let video = document.querySelector("video")
        if (!!video?.srcObject) {
          video.srcObject = stream
        } else {
          video.src = window.URL.createObjectURL(stream)
        }
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
              <video className="video-container" src="" controls></video>
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