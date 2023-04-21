import express from "express";
import {getUsers, getUserById, getAdmins, updateUser} from "../controllers/general.js";



const router = express.Router();


// Users
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.put('/users/edit/:id', updateUser)
router.get('/admins', getAdmins)


export default router;