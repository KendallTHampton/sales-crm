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
        // Refresh Token
        refreshToken: build.mutation({
            query: (body) => ({
                url: "auth/refresh",
                method: 'POST',
                body: body
            }),
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
                url: `/dashboard/tickets/edit/${ body.ticketId }`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ["Tickets"],
        }),

        deleteTicket: build.mutation({
            query: (ticketId) => ({
                url: `/dashboard/tickets/delete/${ ticketId }`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Tickets"]
        }),

        getTicketsSubmittedByUser: build.query({
            query: (userId) => `/dashboard/tickets/submittedBy/${ userId }`,
            providesTags: ["Tickets"]
        }),

        getContacts: build.query({
            query: (userId) => `/dashboard/contacts/${ userId }`,
            providesTags: ["Contacts"]
        }),

        getCampaigns: build.query({
            query: (userId) => `/dashboard/campaigns/${ userId }`,
            providesTags: ["Campaigns"]
        }),

        getCampaignById: build.query({
            query: (campaignId) => `/dashboard/campaign/${ campaignId }`,
            providesTags: ["Campaigns"]
        }),


        getAdmins: build.query({
            query: () => '/general/admins',
            providesTags: ["Admin"]
        }),

        getUser: build.query({
            query: (userId) => `/general/users/${ userId }`,
            providesTags: ["User"]
        }),

        updateUser: build.mutation({
            query: (body) => ({
                url: `/general/users/edit/${ body.userId }`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ["User", 'Contacts'],
        }),


    }),
})



export const {useCreateUserMutation, useLoginUserMutation, useRefreshTokenMutation, useGetTicketsQuery, useSendTicketMutation, useViewTicketQuery, useUpdateTicketMutation, useDeleteTicketMutation, useGetTicketsSubmittedByUserQuery, useGetAdminsQuery, useGetUserQuery, useUpdateUserMutation, useGetContactsQuery, useGetCampaignsQuery, useGetCampaignByIdQuery} = api; 