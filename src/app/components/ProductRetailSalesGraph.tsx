import styled from "styled-components"
import "chartjs-adapter-date-fns"
import { enUS } from "date-fns/locale"

import { parseISO } from "date-fns"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  TimeSeriesScale,
  LineControllerChartOptions,
} from "chart.js"
import { ModalContainer, Spinner, Title } from "../common/styles"
import { Product } from "../common/types"
import { useGetProductsQuery } from "../store"
import { useMemo } from "react"

ChartJS.register(
  TimeSeriesScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
)

const ProductRetailSalesGraphContainer = styled(ModalContainer)`
  flex-direction: column;
  flex: 1;
  border-radius: 4px;
  padding: 21px;
`

ChartJS.defaults.font.family = "Poppins, sans-serif"
ChartJS.defaults.font.size = 18
ChartJS.defaults.color = "#384354"

const GraphContainer = styled.div`
  min-height: 600px;
  flex: 1;
`
const ProductRetailSalesGraph = ({ productId }: { productId: string }) => {
  const { data: products, isLoading } = useGetProductsQuery({})
  const product: Product = useMemo(() => {
    return products?.find((product: Product) => product.id === productId)
  }, [products, productId])

  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: "Retail Sales",
          data:
            product?.sales.map(sale => ({
              x: parseISO(sale.weekEnding),
              y: sale.retailSales,
            })) || [],
          borderColor: "#43A7F6",
          backgroundColor: "#43A7F6",
          tension: 0.2,
        },
        {
          label: "Wholesale Sales",
          data:
            product?.sales.map(sale => ({
              x: parseISO(sale.weekEnding),
              y: sale.wholesaleSales,
            })) || [],
          borderColor: "#9BA6BF",
          tension: 0.2,
        },
      ],
    }
  }, [product])

  return (
    <>
      <ProductRetailSalesGraphContainer>
        <Title>Retail Sales</Title>
        <GraphContainer>
          {isLoading ? (
            <Spinner />
          ) : (
            <Line
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                scales: {
                  x: {
                    min: parseISO("2017-01-01").getTime(),
                    max: parseISO("2017-12-31").getTime(),
                    type: "time",
                    grid: {
                      display: false,
                    },
                    time: {
                      tooltipFormat: "yyyy-MM-dd",
                      unit: "month",
                      displayFormats: {
                        month: "MMM",
                      },
                    },
                    adapters: {
                      date: {
                        locale: enUS,
                      },
                    },
                  },
                  y: {
                    display: false,
                  },
                },
                interaction: {
                  mode: "index",
                  axis: "y",
                },
              }}
              data={data}
            />
          )}
        </GraphContainer>
      </ProductRetailSalesGraphContainer>
    </>
  )
}

export default ProductRetailSalesGraph
