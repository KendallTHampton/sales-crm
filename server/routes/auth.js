import express from 'express';
import {refresh, signup} from '../controllers/auth.js';
import {login} from '../controllers/auth.js';
import {getUsers} from '../controllers/general.js';
import {verifyJWT} from '../middleware/verifyJWT.js';




const router = express.Router();

router.get("/signup", (req, res) => {
    console.log(req.body)
    res.send("Hello World")

})

router.post('/signup', signup)

router.post('/login', login)

router.post('/refresh', refresh)





export default router;