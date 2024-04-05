import styled from "styled-components"
import ProductDetails from "./components/ProductDetails"
import ProductRetailSalesGraph from "./components/ProductRetailSalesGraph"
import ProductRetailSalesTable from "./components/ProductRetailSalesTable"
import { ModalContainer } from "./common/styles"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

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

const defaultProduct = "B007TIE0GQ"
const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get("product") === null) {
      setSearchParams({ product: defaultProduct })
    }
  }, [searchParams])
  const productId = searchParams.get("product") || defaultProduct
  return (
    <PageContainer>
      <ProductDetailsContainer>
        <ProductDetails productId={productId} />
      </ProductDetailsContainer>
      <ProductDataContainer>
        <ProductRetailSalesGraph productId={productId} />
        <ProductRetailSalesTable productId={productId} />
      </ProductDataContainer>
    </PageContainer>
  )
}

export default ProductPage
