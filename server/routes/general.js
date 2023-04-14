import express from "express";
import {getUsers, getUserById, getAdmins} from "../controllers/general.js";



const router = express.Router();


// Authentication 


// Users
router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.get('/admins', getAdmins)


export default router;