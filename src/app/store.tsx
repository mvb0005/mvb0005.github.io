import { configureStore } from "@reduxjs/toolkit"

import data from "./data.json"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { HttpResponse, http } from "msw"
import { setupWorker } from "msw/browser"

export const handlers = [
  http.get("/fakeApi/products", async () => {
    // simulate request time
    await new Promise(resolve => setTimeout(resolve, 1000))
    return HttpResponse.json(data)
  }),
]

export const mockHTTPWorker = setupWorker(...handlers)
export const mockHTTPWorkerOptions = {
  serviceWorker: {
    options: {
      scope: "/fakeApi/products",
    },
  },
}
const productsSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/fakeApi",
  }),
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
  }),
})

export const store = configureStore({
  reducer: {
    [productsSlice.reducerPath]: productsSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsSlice.middleware),
})

export const { useGetProductsQuery } = productsSlice
