import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(express.json({ limit: "10kb" }));  // body-parser

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser()); 
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

export { app };