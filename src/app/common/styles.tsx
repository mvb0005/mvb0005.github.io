import ReactLoading from "react-loading"
import styled from "styled-components"

export const Title = styled.h2`
  margin: 0px;
  margin-bottom: 16px;
  padding: 0;
  color: #384354;
`

export const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
`

const SpinnerContainer = styled.div`
  padding: 20px;
`

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <ReactLoading type={"spin"} color={"#000000"} height={50} width={50} />
    </SpinnerContainer>
  )
}
