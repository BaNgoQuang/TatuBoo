import { Col, Menu, Row } from "antd"
import Header from "../components/Header"
import { LayoutUserStyled } from "./styled"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ListIcons from "src/components/ListIcons"
import { MenuUser } from "../MenuItems"
import { globalSelector } from "src/redux/selector"
import { handleLogout } from "src/lib/commonFunction"
import { ContentContainerStyled, ContentStyled } from "../styled"

const LayoutUser = ({ children }) => {

  const navigate = useNavigate()
  const { user } = useSelector(globalSelector)
  const location = useLocation()
  const dispatch = useDispatch()

  const handleChangeMenu = (key) => {
    if (key !== "logout") {
      navigate(key)
    } else {
      handleLogout(dispatch, navigate)
    }
  }

  return (
    <LayoutUserStyled>
      <Header />
      <ContentContainerStyled>
        {/* <ContentStyled> */}
        <Row gutter={[16, 8]}>
          <Col span={5}>
            <div
              className="menu-container"
            >
              <Menu
                mode="inline"
                onClick={e => handleChangeMenu(e.key)}
                items={MenuUser()}
                selectedKeys={location?.pathname}
              />
            </div>
          </Col>
          <Col span={19}>
            <div className="content-container">
              {children}
            </div>
          </Col>
        </Row>
        {/* </ContentStyled> */}
      </ContentContainerStyled>
    </LayoutUserStyled>
  )
}

export default LayoutUser