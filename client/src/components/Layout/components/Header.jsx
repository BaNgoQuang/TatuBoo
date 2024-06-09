import { Col, Dropdown, Empty, Menu, Row, Tooltip } from "antd"
import { BadgeStyled, HeaderContainerStyled, HeaderStyled } from "../styled"
import logo from '/logo.png'
import { MenuCommon, MenuUser } from "../MenuItems"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import Router from "src/routers"
import ListIcons from "src/components/ListIcons"
import InputCustom from "src/components/InputCustom"
import { handleLogout } from "src/lib/commonFunction"
import moment from "moment"
import { useEffect, useState } from "react"
import NotificationService from "src/services/NotificationService"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import socket from "src/utils/socket"
import { Roles } from "src/lib/constant"

const NotificationItem = ({
  data,
  navigate,
  handleSeenNotification
}) => {
  return (
    <div
      onClick={() => {
        handleSeenNotification()
        navigate(`/dashboard/${data?.Type}`)
      }}
      style={{ margin: '8px 0' }}
      className={data?.IsSeen ? "gray-text" : "black-text not-seen-notify"}
    >
      <p>
        {data?.Content}
      </p>
      <p>
        {moment(data.createdAt).calendar()}
      </p>
    </div>
  )
}


const Header = () => {

  const global = useSelector(globalSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [notifiNotSeen, setNotifiNotSeen] = useState(0)
  const location = useLocation()

  const handleSeenNotification = async () => {
    const res = await NotificationService.seenNotification(global?.user?._id)
    if (res?.isError) return
    getNotifications()
  }

  const getNotifications = async () => {
    const res = await NotificationService.getListNotification(global?.user?._id)
    if (res?.isError) return
    setNotifications(res?.data?.List)
    setNotifiNotSeen(res?.data?.NotSeen)
  }

  useEffect(() => {
    if (!!global?.user?._id && global?.user?.RoleID === Roles.ROLE_ADMIN) getNotifications()
  }, [])

  const menuAccoutUser = [
    {
      key: Router.PROFILE,
      isView: true,
      label: (
        <div>Quản trị</div>
      ),
      onClick: () => navigate(Router.PROFILE)
    },
    {
      label: (
        <div>Đăng xuất</div>
      ),
      onClick: () => handleLogout(dispatch, navigate)
    },
  ]

  const itemsNotification = [
    {
      key: '1',
      label: (
        notifications?.length > 0 ?
          <div style={{ width: '300px', padding: '12px' }}>
            {
              notifications?.map((i, idx) =>
                <NotificationItem
                  key={idx}
                  data={i}
                  navigate={navigate}
                  handleSeenNotification={handleSeenNotification}
                />
              )
            }
          </div>
          :
          <Empty description="Chưa có thông báo" />
      )
    }
  ]

  socket.on('get-notification', (data) => {
    setNotifications(pre => [...pre, data])
    setNotifiNotSeen(notifiNotSeen + 1)
  })

  return (
    <HeaderContainerStyled>
      <HeaderStyled>
        <Row>
          <Col span={2}>
            <img
              className="cursor-pointer"
              onClick={() => navigate("/")}
              src={logo}
              alt=""
              style={{ width: '35px', height: "50px", marginTop: '5px', marginRight: "12px" }}
            />
          </Col>
          <Col span={20} className="d-flex-center">
            {
              ![Roles.ROLE_ADMIN, Roles.ROLE_STAFF].includes(global?.user?.RoleID) &&
              <div
              // style={{ flex: 1 }}
              >
                <Menu
                  mode="horizontal"
                  items={MenuCommon()}
                  selectedKeys={location?.pathname}
                  onClick={(e) => navigate(e?.key)}
                />
              </div>
            }
          </Col>
          <Col span={2} className="d-flex-end mt-16">
            {
              ![Roles.ROLE_ADMIN, Roles.ROLE_STAFF]?.includes(global?.user?.RoleID) ?
                <Dropdown
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow
                  overlay={
                    <>
                      <InputCustom
                        placeholder="Bạn muốn học gì?"
                        style={{ width: "500px" }}
                      />
                    </>
                  }
                >
                  <div>{ListIcons.ICON_SEARCH}</div>
                </Dropdown>
                :
                <Dropdown
                  menu={{ items: itemsNotification }}
                  trigger={['click']}
                  // onClick={() => {
                  //   if (notifiNotSeen !== 0) {
                  //     handleSeenNotification()
                  //   }
                  // }}
                  onOpenChange={e => {
                    if (!e) {
                      if (notifiNotSeen !== 0) handleSeenNotification()
                    }
                  }}
                >
                  <BadgeStyled
                    size="small"
                    count={notifiNotSeen}
                    style={{ fontSize: '10px' }}
                  >
                    <ButtonCircle
                      icon={ListIcons.ICON_BELL}
                    />
                  </BadgeStyled>
                </Dropdown>
            }
            <div className="ml-12 mb-10">
              {
                global?.user?._id ?
                  <Tooltip arrow={false} title={global?.user?.FullName} trigger="hover">
                    <Dropdown menu={{ items: menuAccoutUser }} trigger={['click']}>
                      <img
                        style={{
                          display: "block",
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%"
                        }}
                        src={global?.user?.AvatarPath}
                        alt=""
                      />
                    </Dropdown>
                  </Tooltip>
                  :
                  <div
                    className="d-flex-end cursor-pointer"
                    onClick={() => navigate("/dang-nhap")}
                  >
                    <img
                      src="https://takelessons.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ficon-avatar.95340bc0.png&w=1920&q=75"
                      alt=""
                      style={{
                        // width: '32px',
                        height: "35px"
                      }}
                    />
                    <span className="ml-12 fs-16">Đăng nhập</span>
                  </div>
              }
            </div>
          </Col>
        </Row>
      </HeaderStyled>
    </HeaderContainerStyled>
  )
}

export default Header