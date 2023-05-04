import express from "express";
import {getTickets, getTicketById, updateTicket, deleteTicket, getTicketsSubmittedByUser, getContacts, getCampaigns, getCampaignById, createCampaign, deleteCampaign, updateCampaign} from "../controllers/dashboard.js";

const router = express.Router();

/* Tickets */
router.get("/tickets", getTickets);
router.get('/tickets/:id', getTicketById)
router.get('/tickets/submittedBy/:id', getTicketsSubmittedByUser)
router.put('/tickets/edit/:id', updateTicket)
router.delete('/tickets/delete/:id', deleteTicket)
/* Contacts */
router.get('/contacts/:id', getContacts)
/* Campaigns */
router.get('/campaigns/:id', getCampaigns) // User's campaigns
router.get('/campaignDetails/:id', getCampaignById) // Campaign details
router.put('/campaign/update/:id', updateCampaign) // Edit campaign
router.post('/campaign/create', createCampaign) // Create campaign
router.delete('/campaign/delete/:id', deleteCampaign) // Delete campaign









export default router;