import styled from "styled-components"
import ProductDetails from "./components/ProductDetails"
import ProductRetailSalesGraph from "./components/ProductRetailSalesGraph"
import ProductRetailSalesTable from "./components/ProductRetailSalesTable"
import { ModalContainer } from "./common/styles"

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 81px 21px 81px 21px;
  gap: 21px;
`

const ProductDetailsContainer = styled(ModalContainer)`
  width: 350px;
`

const ProductDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  gap: 80px;
`

const ProductPage = () => {
  return (
    <PageContainer>
      <ProductDetailsContainer>
        <ProductDetails />
      </ProductDetailsContainer>
      <ProductDataContainer>
        <ProductRetailSalesGraph />
        <ProductRetailSalesTable />
      </ProductDataContainer>
    </PageContainer>
  )
}

export default ProductPage
