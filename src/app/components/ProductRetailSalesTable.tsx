import { ModalContainer, Spinner } from "../common/styles"
import { DataGrid } from "@mui/x-data-grid"
import { format, parseISO } from "date-fns"
import { useGetProductsQuery } from "../store"
import { useMemo } from "react"
import { Product } from "../common/types"

const ProductRetailSalesTable = ({ productId }: { productId: string }) => {
  const { data: products, isLoading } = useGetProductsQuery({})

  const sales = useMemo(() => {
    return (
      products?.find((product: Product) => product.id === productId)?.sales ||
      []
    )
  }, [products, productId])

  if (isLoading) {
    return (
      <ModalContainer>
        <Spinner />
      </ModalContainer>
    )
  }

  return (
    <ModalContainer>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: "weekEnding", sort: "asc" }],
          },
        }}
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 300,
          color: "#384354",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        getRowId={row => row.weekEnding}
        rows={sales}
        columns={[
          {
            field: "weekEnding",
            headerName: "WEEK ENDING",
            flex: 1,
            valueGetter: ({ value }) => {
              return format(parseISO(value), "dd-MM-yy")
            },
            align: "center",
            headerAlign: "center",
          },
          {
            field: "retailSales",
            headerName: "RETAIL SALES",
            flex: 1,
            valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
            type: "number",
          },
          {
            field: "wholesaleSales",
            headerName: "WHOLESALE SALES",
            flex: 1,
            valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
            type: "number",
          },
          {
            field: "unitsSold",
            headerName: "UNITS SOLD",
            flex: 1,
            valueFormatter: ({ value }) => `${value.toLocaleString()}`,
            type: "number",
          },
          {
            field: "retailerMargin",
            headerName: "RETAILER MARGIN",
            flex: 1,
            valueFormatter: ({ value }) => `$${value.toLocaleString()}`,
            type: "number",
          },
        ]}
      />
    </ModalContainer>
  )
}

export default ProductRetailSalesTable
