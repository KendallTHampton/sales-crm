import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setCurrentUser} from "./User";


export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["User", "SignUp", "Login", 'Tickets'],
    endpoints: (build) => ({
        /* USER SIGN IN/SIGN OUT*/
        // Creates A New User
        createUser: build.mutation({
            query: (body) => ({
                url: "auth/signup",
                method: "POST",
                body: body,
                providesTags: ["SignUp"],
            })
        }),
        // Logs In A User
        loginUser: build.mutation({
            query: (body) => ({
                url: "auth/login",
                method: 'POST',
                body: body
            })
        }),

        // Send A Ticket
        sendTicket: build.mutation({
            query: (body) => ({
                url: "/clientside/ticket",
                method: 'POST',
                body: body
            })
        }),

        /* DASHBOARD */
        // Gets All Tickets
        getTickets: build.query({
            query: () => '/dashboard/tickets',
            providesTags: ["Tickets"]
        }),

        viewTicket: build.query({
            query: (ticketId) => `/dashboard/tickets/${ ticketId }`,
            providesTags: ["Tickets"]
        }),

        updateTicket: build.mutation({
            query: (body) => ({
                url: `/dashboard/tickets/${ body.ticketId }/edit`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ["Tickets"],
        }),

        getAdmins: build.query({
            query: () => '/general/admins',
            providesTags: ["Admin"]
        }),

        getUser: build.query({
            query: (userId) => `/general/user/${ userId }`,
            providesTags: ["User"]
        }),

    }),
})


export const {useCreateUserMutation, useLoginUserMutation, useGetTicketsQuery, useSendTicketMutation, useViewTicketQuery, useUpdateTicketMutation, useGetAdminsQuery, useGetUserQuery} = api; 