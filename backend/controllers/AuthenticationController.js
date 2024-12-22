import User  from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt  from "jsonwebtoken";

export const CreateUser = async (req, res) => {
    try {
        const {username,password,email,phoneNo}=req.body;
        console.log(username,password,email,phoneNo);
        const existingUserName = await User.findOne({username});
        console.log(existingUserName);
        if(existingUserName)
        {
            console.log("Username already exists");
            return res.status(400).send("Username already exists");
        }

        const existingUserEmail = await User.findOne({email});
        if(existingUserEmail)
        {
            console.log("User email already exists");
            return res.status(400).send("User Email already exists");
        }

        const hashPassword = await bcrypt.hash(password,12);
        const user = new User({
            username,
            password: hashPassword,
            email,
            phoneNo
        })
        console.log("user created");
        await user.save();
        res.status(201).json(user);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Something went wrong ,user not created");
    }
}

export const LoginUser = async (req, res) => {
    try {
        const {username,password}=req.body;
        console.log(username,password);
        const user = await User.findOne({username});
        console.log(user);
        if(!user)
        {
            console.log("User does not exists");
            return res.status(400).send("User does not exists");
        }

       
        const isCorrectPassword = await bcrypt.compare(password,user.password);
        if(!isCorrectPassword)
        {
            console.log("Incorrect User password");
            return res.status(400).send("Incorrect User password");
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn : "1h"});
        console.log("User logged in");
        res.status(201).json({user,token});
    }
    catch(error){
        console.error(error);
        res.status(500).send("Something went wrong ,user not logged in");
    }
}