import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";


export const shopApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),

    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),

        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
        }),

        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`
        }) 
    })
});

export const{ useGetCategoriesQuery, useGetProductsByCategoryQuery, useGetProductByIdQuery } = shopApi 

