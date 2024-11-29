import express from "express";

const HostRouter = express.Router();

HostRouter.get("/",(req,res)=>{
    res.send("Host routes");
})

export default HostRouter;