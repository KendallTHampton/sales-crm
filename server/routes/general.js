import express from "express";
import {getUsers, getUserById, getAdmins, updateUser, getNonAdmins} from "../controllers/general.js";



const router = express.Router();


// Users
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.put('/users/edit/:id', updateUser)
router.get('/admins', getAdmins)
router.get('/nonAdmins', getNonAdmins)


export default router;