import express from "express";
import { CreateUser, LoginUser,LoginBackUser } from "../controllers/AuthenticationController.js";

const AuthenticationRouter = express.Router();

AuthenticationRouter.get("/",(req,res)=>{
    res.send("Authentication routes");
})

AuthenticationRouter.post("/register",CreateUser);
AuthenticationRouter.post("/login",LoginUser);
AuthenticationRouter.get("/me",LoginBackUser);

export default AuthenticationRouter;