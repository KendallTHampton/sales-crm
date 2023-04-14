import express from 'express';
import {sendATicket} from '../controllers/clientside.js';

const router = express.Router();


router.post('/ticket', sendATicket)


export default router;