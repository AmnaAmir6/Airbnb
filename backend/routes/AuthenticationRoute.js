import express from "express";
import { CreateUser } from "../controllers/AuthenticationController.js";

const AuthenticationRouter = express.Router();

AuthenticationRouter.get("/",(req,res)=>{
    res.send("Authentication routes");
})

AuthenticationRouter.post("/register",CreateUser);

export default AuthenticationRouter;