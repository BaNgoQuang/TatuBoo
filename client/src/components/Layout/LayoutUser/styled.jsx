import styled from "styled-components"

export const LayoutUserStyled = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
.menu-container {
  margin-right: 12px;
  border-color: none;
  height: calc(100vh - 74px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.content-container {
  padding: 12px;
  /* overflow: scroll;
  overflow-x: hidden; */
}
.collapsed-menu {
  padding: 12px 20px;
}
.ant-menu-light.ant-menu-root.ant-menu-inline {
  border-inline-end: none !important
}
`