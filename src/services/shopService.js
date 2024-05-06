export const shopApi = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),

    endpoints: (builder) => ({
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
        }),

        getCategories: builder.quey({
            query: () => `categories.json`
        }),

        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`
        }) 
    })
});


