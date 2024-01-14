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


app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}/`);
});
mongoose.Promise =Promise;
mongoose.connect(process.env.MONGO_URL  || "");
mongoose.connection.on("error", (error:Error) => {
    console.log(error);
  });