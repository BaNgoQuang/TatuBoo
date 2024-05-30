import { Badge } from "antd"
import styled from "styled-components"

export const LayoutStyled = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;
`

export const ContentStyled = styled.div`
  /* width: 80%;
  margin: auto; */
    background-color: #dff3fe;
  background-image: linear-gradient(90deg,rgba(27,177,148,.036),rgba(29,183,194,.036) 101.24%);
`

export const FooterStyled = styled.div`
  width: 80%;
  margin: auto;
  background-image: linear-gradient(90deg,rgba(27,177,148,.036),rgba(29,183,194,.036) 101.24%);
`
export const HeaderContainerStyled = styled.div`
  margin-bottom: 12px;
`

export const HeaderStyled = styled.div`
  max-width: 90%;
  margin: auto;
 .ant-menu-horizontal {
    border-bottom: none !important;
  }
`

export const BadgeStyled = styled(Badge)`
  .ant-badge,
  .ant-badge-count {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(0%, -40%);
    transform-origin: 100% 0%;
  }
`