import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseAuthUrl } from "../databases/users";
import { baseUrl } from "../databases/realtimeDataBase";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl, baseAuthUrl }),
    endpoints: (builder) => ({
        singUp: builder.mutation({
            query: ({...auth}) => ({
                url:  `/accounts:singUp?key=${apiKey}`,
                method: "POST", 
                body:auth,
            }),
        }),
    }),
})

export const { useSingUpMutation} = authApi