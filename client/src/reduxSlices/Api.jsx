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
            query: (campaignId) => `/dashboard/campaignDetails/${ campaignId }`,
            providesTags: ["Campaigns"]
        }),

        createCampaign: build.mutation({
            query: (body) => ({
                url: `/dashboard/campaign/create`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ["Campaigns"]
        }),

        updateCampaign: build.mutation({
            query: (body) => ({
                url: `/dashboard/campaign/update/${ body.campaignId }`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ["Campaigns"]
        }),

        deleteCampaign: build.mutation({
            query: (campaignId) => ({
                url: `/dashboard/campaign/delete/${ campaignId }`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Campaigns"]
        }),

        createComment: build.mutation({
            query: (body) => ({
                url: `/dashboard/campaign/createcomment`,
                method: 'POST',
                body
            }),
            invalidatesTags: ["Campaigns"]
        }),

        deleteComment: build.mutation({
            query: (body) => ({
                url: `/dashboard/campaign/deletecomment`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: ["Campaigns"]
        }),

        getAdmins: build.query({
            query: () => '/general/admins',
            providesTags: ["Admins"]
        }),

        getAdminById: build.query({
            query: adminId => `/general/admin/${ adminId }`,
            providesTags: ["Admin"]
        }),

        getNonAdmins: build.query({
            query: () => '/general/nonAdmins',
            providesTags: ["NonAdmin"]
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



export const {useCreateUserMutation, useLoginUserMutation, useRefreshTokenMutation, useGetTicketsQuery, useSendTicketMutation, useViewTicketQuery, useUpdateTicketMutation, useDeleteTicketMutation, useGetTicketsSubmittedByUserQuery, useGetAdminsQuery, useGetAdminByIdQuery, useGetNonAdminsQuery, useGetUserQuery, useUpdateUserMutation, useGetContactsQuery, useGetCampaignsQuery, useGetCampaignByIdQuery, useCreateCampaignMutation, useUpdateCampaignMutation, useDeleteCampaignMutation, useCreateCommentMutation, useDeleteCommentMutation} = api; 