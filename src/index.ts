import dotenv from 'dotenv';
dotenv.config();
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
import {random} from './helpers/index';

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

console.log(random());

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}/`);
});


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`mongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error ${err}`);
  }
};
connectDB();



