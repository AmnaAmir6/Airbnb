import express from 'express'
import mongoose from 'mongoose'

import AuthenticationRouter from "./routes/AuthenticationRoute.js"
import AdminRouter from "./routes/AdminRoute.js"
import HostRouter from './routes/HostRoute.js';
import ListingRouter from './routes/ListingRoute.js';
const URI=process.env.MONGODB_URI;
const port =8880;

const app = express();

mongoose.connect(URI);

mongoose.connection.once("open",()=>{
    console.log("Database connected");
})

mongoose.connection.on("error",(err)=>{
    console.log("Error: ",err);
})

mongoose.connection.on("disconnected",()=>{
    console.log("Database disconnected");
})

app.use("/api/auth",AuthenticationRouter);
app.use("/api/admin",AdminRouter);
app.use("/api/host",HostRouter);
app.use("/api/listing",ListingRouter);

app.listen(port,()=>{
    console.log(`server running on port ${port}.`);
})