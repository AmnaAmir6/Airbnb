import express from "express";
import { CreateUser, LoginUser } from "../controllers/AuthenticationController.js";

const AuthenticationRouter = express.Router();

AuthenticationRouter.get("/",(req,res)=>{
    res.send("Authentication routes");
})

AuthenticationRouter.post("/register",CreateUser);
AuthenticationRouter.post("/login",LoginUser);
export default AuthenticationRouter;