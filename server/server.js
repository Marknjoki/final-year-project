import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import router from './Routes/router.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', router);

app.listen(process.env.PORT || 4000, () => {

    console.log(`app is listenong on port ${process.env.PORT}....`)
})
