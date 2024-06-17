import { ContentContainerStyled, ContentStyled, FooterStyled, LayoutStyled } from "../styled"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useSelector } from "react-redux"
import { globalSelector } from "src/redux/selector"
import ModalChat from "../components/ModalChat"

const MainLayout = ({ children }) => {

  const { user } = useSelector(globalSelector)

  return (
    <LayoutStyled>
      <div>
        <Header />
      </div>
      <ContentContainerStyled>
        <ContentStyled>
          {children}
        </ContentStyled>
      </ContentContainerStyled>
      <FooterStyled>
        <Footer />
      </FooterStyled>
      {
        !!user?._id &&
        <ModalChat />
      }
    </LayoutStyled>
  )
}

export default MainLayout
