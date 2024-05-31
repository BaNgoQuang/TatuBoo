import { ContentStyled, FooterStyled, LayoutStyled } from "../styled"
import Header from "../components/Header"
import Footer from "../components/Footer"


const MainLayout = ({ children }) => {

  return (
    <LayoutStyled>
      <div style={{ lineHeight: '64px' }}>
        <Header />
      </div>
      <ContentStyled>
        {children}
      </ContentStyled>
      <FooterStyled>
        <Footer />
      </FooterStyled>
    </LayoutStyled>
  )
}

export default MainLayout
