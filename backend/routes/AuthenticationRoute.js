import express from "express";

const AuthenticationRouter = express.Router();

AuthenticationRouter.get("/",(req,res)=>{
    res.send("Authentication routes");
})

export default AuthenticationRouter;