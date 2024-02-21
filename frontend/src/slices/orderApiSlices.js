import {apiSlice} from '../slices/appSlices'
import { ORDERS_URL } from '../constants'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: ( builder ) => ({
        createOrder: builder.mutation({
            query: (order)=>({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order}

            })
        }),

        getOrderDetails:builder.query({
            query: (orderId) =>({
                url:`${ORDERS_URL}/${orderId}`,
                method:'GET'
            }),
            keepUnusedDataFor: 5
        }),
        
        getOrders:builder.query({
            query:()=>({
                url:`${ORDERS_URL}`,
                method:'GET'

            }),
            keepUnusedDataFor: 5
        }),
         deliveredOrder:builder.mutation({
            query:(orderId)=>({
                url:`${ORDERS_URL}/${orderId}/deliver`,
                method:'PUT'
            })
         })


    })
})

export const {useCreateOrderMutation,useGetOrderDetailsQuery,useGetOrdersQuery,useDeliveredOrderMutation} = orderApiSlice