import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import admin, {auth} from '../firebaseAdmin.js';
import jwt from 'jsonwebtoken'
import crypto from 'crypto';

const SECRET_KEY = crypto.randomBytes(32).toString('hex');
const REFRESH_SECRET_KEY = crypto.randomBytes(32).toString('hex');

// JWT HELPER FUNCTIONS
function generateAccessToken(user) {
    return jwt.sign({user}, SECRET_KEY, {expiresIn: '7d'});
}

function generateRefreshToken(user) {
    return jwt.sign({user}, REFRESH_SECRET_KEY, {expiresIn: '30d'});
}


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
    const {email} = req.body;
    try {
        const findUserInFirebase = await auth.getUserByEmail(email)
        if (!findUserInFirebase) {
            res.status(400).json({error: 'Invalid Credentials'});
        }
        const user = await User.findOne({email: email}).select('-password').lean();

        console.log(user)
        if (!user) {
            res.status(400).send("Invalid Credentials");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        res.status(401).json({error: 'Unauthorized'});
    }
    try {
        jwt.verify(refreshToken, REFRESH_SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.status(403).json({error: "Forbidden"})
            }
            console.log(decoded)
            const user = await User.find({email: decoded.user.email}).select('-password').lean();

            const accessToken = generateAccessToken(user);
            res.status(200).json({accessToken: accessToken})
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }


}