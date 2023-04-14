import express from "express";
import {getTickets, getTicketById, updateTicket} from "../controllers/dashboard.js";

const router = express.Router();



// Tickets
router.get("/tickets", getTickets);
router.get('/tickets/:id', getTicketById)
router.put('/tickets/:id/edit', updateTicket)





export default router;