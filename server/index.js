import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import generalRoutes from './routes/general.js';
import clientRoutes from './routes/clientside.js';
import dashboardRoutes from './routes/dashboard.js';
import authRoutes from './routes/auth.js';
dotenv.config();


/* Models */
import User from './models/userModel.js';
import {userData} from './data/userData.js';
import Ticket from './models/ticketModel.js';
import {ticketData} from './data/ticketData.js';
const insertData = async (dataModel, data) => {
    try {
        const existingData = await dataModel.find({});
        if (existingData.length === 0) {
            await dataModel.insertMany(data);
        }
    } catch (error) {
        console.log(error);
    }
};


/* Middle Ware*/
app.use(cors());
app.use(express.json());

/* Routes */
app.use('/general', generalRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/auth', authRoutes)
app.use('/clientside', clientRoutes)


app.get("/", (req, res) => {
    res.send("Hello World")
})


/* Connect to MongoDB */
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {


    app.listen(process.env.PORT, () => {console.log("server is running on port 5000")})



}).catch((error) => console.log(error.message));

