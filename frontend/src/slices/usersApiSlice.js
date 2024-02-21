import { USERS_URL } from "../constants";
import { apiSlice } from "./appSlices";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        
        login: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,

            }),
            
        }),

        register: builder.mutation({
            query: (data)=>({
                url:`${USERS_URL}`,
                method:'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                body: data
            })
        }),

        getUsers: builder.query({
            query: ()=>({
                url:USERS_URL,
            }),

            providesTags:['Users'],
            keepUnusedDataFor: 5
        }),

        deleteUser: builder.mutation({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                method:'DELETE'
            }),

            providesTags:['Users'],
            keepUnusedDataFor: 5
        }),

        getUserDetails: builder.query({
            query:(userId)=>({
                url:`${USERS_URL}/${userId}`,
                method:'GET'

            }),

            providesTags:['Users']
        }),

        updateUser:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/${data.userId}`,
                method:'PUT',
                body:data
            }),

            invalidatesTags:['Users'],
            keepUnusedDataFor: 5
        })
        
    }),
})

export const { useLoginMutation, useLogoutMutation,useRegisterMutation, useGetUsersQuery,useDeleteUserMutation,useUpdateUserMutation,useGetUserDetailsQuery } = usersApiSlice;