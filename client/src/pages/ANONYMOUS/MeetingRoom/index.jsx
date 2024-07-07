import { Col, Row, Space } from "antd"
import { MeetingRoomContainerStyled } from "./styled"
import ListIcons from "src/components/ListIcons"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ChatBox from "src/components/ChatBox"
import InputCustom from "src/components/InputCustom"
import { BiSolidSend } from "react-icons/bi"
import Peer from "peerjs"
import ReactPlayer from "react-player"
import socket from "src/utils/socket"


const MeetingRoom = () => {

  const { RoomID } = useParams()
  const [isShowChatbox, setIsShowChatbox] = useState(false)
  const [messages, setMessages] = useState([])
  const [total, setTotal] = useState(0)
  const [users, setUsers] = useState([])
  const [player, setPlayer] = useState() // lưu player nhưng dưới dạng object nhiều trường mỗi trường tương đương 1 người dùng thay vì mảng
  const [myID, setMyID] = useState()
  const [peer, setPeer] = useState()
  const [pagination, setPagination] = useState({
    PageSize: 7,
    CurrentPage: 1,
  })

  const initWebRTC = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      const peer = new Peer()
      setPeer(peer)
      peer.on("open", id => {
        // setPlayer(pre => ({
        //   ...pre,
        //   [id]: {
        //     stream,
        //     playing: true,
        //     muted: true
        //   }
        // }))
        console.log(JSON.stringify(stream));
        socket.emit("join-meeting-room", {
          RoomID: RoomID,
          PeerID: id,
          Stream: JSON.stringify(stream),
          Playing: true,
          Muted: true
        })
      })
    } catch (error) {
      console.log("error", error.toString());
    }
  }

  socket.on("user-connected-meeting-room", data => {
    console.log("listen");
    setPlayer(pre => ({
      ...pre,
      [data.PeerID]: {
        stream: JSON.parse(data.Stream),
        playing: data.Playing,
        muted: data.Muted
      }
    }))
  })

  useEffect(() => {
    initWebRTC()
  }, [])

  console.log(player);

  return (
    <MeetingRoomContainerStyled>
      <Row>
        <Col span={18}>
          <Row className="left-screen">
            <Col span={24}>
              {
                !!player &&
                Object.keys(player)?.map(peerID =>
                  <div key={peerID} className="video-container">
                    <ReactPlayer
                      key={peerID}
                      url={player[peerID]?.stream}
                      playing={player[peerID]?.playing}
                      muted={player[peerID]?.muted}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )
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