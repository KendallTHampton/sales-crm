import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import admin, {auth} from '../firebaseAdmin.js';
import jwt from 'jsonwebtoken'




// This Sign Up Function's Purpose is to create a new user create a new user in the MongoDB Database. 
export const signup = async (req, res) => {
    try {
        const {email, password, firstName, lastName} = req.body;
        const newUser = new User({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });
        await newUser.save();
        res.status(200).json({});
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
}

// This Login Function's Purpose is to check if the user exists in the Firebase users then it will check if the user exists in the MongoDB 
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const findUserInFirebase = await auth.getUserByEmail(email)
        if (!findUserInFirebase) {
            res.status(400).json({error: 'Invalid Credentials'});
        }
        const user = await User.find({email: email, password: password}).select('firstName lastName email isAdmin');
        console.log(user)

        res.status(200).json({data: user});

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const refresh = async (req, res) => {
    const {token} = req.body
    const accessToken = jwt.sign({token}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
    res.status(200).json({accessToken: accessToken})
}