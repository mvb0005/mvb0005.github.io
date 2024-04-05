export interface Product {
  id: string
  title: string
  image: string
  subtitle: string
  brand: string
  reviews: ReviewsEntity[]
  retailer: string
  details: string[]
  tags: string[]
  sales: SalesEntity[]
}

export interface ReviewsEntity {
  customer: string
  review: string
  score: number
}

export interface SalesEntity {
  weekEnding: string
  retailSales: number
  wholesaleSales: number
  unitsSold: number
  retailerMargin: number
}
