import styled from "styled-components";
import { Spinner, Title } from "../common/styles"
import { useGetProductsQuery } from "../store"
import { useMemo } from "react"
import { Product } from "../common/types"

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
`

// This is supposed to be a slightly different font but
// I don't have the font file so I'm just using the same font
// I'm also making this a tad darker for accessibility reasons
const Subtitle = styled.h3`
  margin: 0px;
  margin-bottom: 16px;
  font-size: smaller;
  width: 70%;
  font-weight: 400;
  color: #798795;
`

const ProductImage = styled.img`
  width: 100%;
  max-width: 250px;
  object-fit: contain;
  padding: 30px;
`

const BorderDiv = styled.div`
  border-top: 1px solid #e0e4e7;
  border-bottom: 1px solid #e0e4e7;
`
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
`

// a div with a rounded border around the text
const Tag = styled.div`
  padding: 3px 20px;
  border-radius: 5px;
  border: 1px solid #e0e4e7;
  font-size: 0.85em;
  color: #384354;
  font-weight: 400;
`

const ProductDetails = ({ productId }: { productId: string }) => {
  const { data: products, isLoading } = useGetProductsQuery({})

  const product: Product = useMemo(() => {
    return products?.find((product: Product) => product.id === productId)
  }, [products, productId])

  if (isLoading) {
    return (
      <ProductDiv>
        <Spinner />
      </ProductDiv>
    )
  }

  return (
    <ProductDiv>
      <ProductImage src={product["image"]} alt={product["title"]} />
      <Title>{product["title"]}</Title>
      <Subtitle>{product["subtitle"]}</Subtitle>
      <BorderDiv>
        <TagsContainer>
          {product.tags.map((tag, idx) => {
            return <Tag key={idx}>{tag}</Tag>
          })}
        </TagsContainer>
      </BorderDiv>
    </ProductDiv>
  )
}

export default ProductDetails;