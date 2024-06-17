import { Col, Menu, Row } from "antd"
import Header from "../components/Header"
import { LayoutUserStyled } from "./styled"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { MenuUser } from "../MenuItems"
import { handleLogout } from "src/lib/commonFunction"
import { ContentContainerStyled } from "../styled"

const LayoutUser = ({ children }) => {

  const navigate = useNavigate()
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
        <Row>
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
      </ContentContainerStyled>
    </LayoutUserStyled>
  )
}

export default LayoutUser