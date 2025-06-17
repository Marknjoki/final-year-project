import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import router from './Config/database.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(3000, () => {

    console.log('app is listenong on port 3000....')
})
