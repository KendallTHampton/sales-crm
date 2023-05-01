import express from "express";
import {getTickets, getTicketById, updateTicket, deleteTicket, getTicketsSubmittedByUser, getContacts, getCampaigns, getCampaignById, viewUserCampaigns, editCampaign} from "../controllers/dashboard.js";

const router = express.Router();

// Tickets
router.get("/tickets", getTickets);
router.get('/tickets/:id', getTicketById)
router.get('/tickets/submittedBy/:id', getTicketsSubmittedByUser)
router.put('/tickets/edit/:id', updateTicket)
router.delete('/tickets/delete/:id', deleteTicket)

router.get('/contacts/:id', getContacts)
// Campaigns
router.get('/campaigns/:id', getCampaigns)
router.get('/campaignDetails/:id', getCampaignById)
router.get('/userCampaigns/:id', viewUserCampaigns)
router.put('/campaign/edit/:id', editCampaign)








export default router;