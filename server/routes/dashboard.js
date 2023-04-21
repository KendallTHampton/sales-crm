import express from "express";
import {getTickets, getTicketById, updateTicket, deleteTicket, getTicketsSubmittedByUser, getContacts, getCampaigns, getCampaignById} from "../controllers/dashboard.js";

const router = express.Router();

// Tickets
router.get("/tickets", getTickets);
router.get('/tickets/:id', getTicketById)
router.get('/tickets/submittedBy/:id', getTicketsSubmittedByUser)
router.put('/tickets/edit/:id', updateTicket)
router.delete('/tickets/delete/:id', deleteTicket)
router.get('/contacts/:id', getContacts)
router.get('/campaigns/:id', getCampaigns)
router.get('/campaign/:id', getCampaignById)







export default router;