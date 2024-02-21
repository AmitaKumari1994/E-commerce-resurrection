import { PRODUCT_URL,UPLOAD_URL } from "../constants";
import { apiSlice } from "./appSlices";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        
        getProducts: builder.query({
            query: ()=>({
                url:PRODUCT_URL
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductsDetails: builder.query({
            query:(productId)=>({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor:5
        }),
        createProducts:builder.mutation({
            query:()=>({
                url:PRODUCT_URL,
                method:'POST',
            }),
            invalidatesTags:['Product']
        }),

        updateProduct:builder.mutation({
            query: (data)=>({
                url:`${PRODUCT_URL}/${data.productId}`,
                method:'PUT',
                body:data
                
            }),
            invalidatesTags:['Products'],
            providesTags:['Products']
        }),

        deleteProduct:builder.mutation({
            query:(productId)=>({
                url:`${PRODUCT_URL}/${productId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Products'],
            providesTags:['Products']
        }),

        uploadProductImage:builder.mutation({
            query:(data)=>({
                url:`${UPLOAD_URL}`,
                method:'POST',
                body:data
            })
        }),

    }),
})

export const { useUploadProductImageMutation,useGetProductsQuery, useGetProductsDetailsQuery,useCreateProductsMutation, useUpdateProductMutation, useDeleteProductMutation } = productApiSlice;