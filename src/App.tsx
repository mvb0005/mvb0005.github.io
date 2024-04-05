import styled from "styled-components"

import ProductPage from "./app/ProductPage"
import logo from "./app/common/logo.png"

const BackgroundContainer = styled.div`
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const AppStyled = styled.div`
  height: 100%;
  width: 100%;
  font-family: Poppins, sans-serif;
`

const TopNavBar = styled.div`
  width: 100%;
  height: 87px;
  background-color: #052849;
  display: flex;
`

// Note, the S is centered, not the full image.
const Logo = styled.a`
  padding: 29px;
  display: block;
  img {
    width: 21px;
  }
`
const App = () => {
  return (
    <AppStyled className="App">
      <BackgroundContainer>
        <TopNavBar>
          <Logo
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.stackline.com/"
          >
            <img src={logo} alt="Stackline Logo" />
          </Logo>
        </TopNavBar>

        <ProductPage />
      </BackgroundContainer>
    </AppStyled>
  )
}

export default App
