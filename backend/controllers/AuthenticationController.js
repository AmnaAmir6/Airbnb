import User  from "../models/User.js";
import bcrypt from 'bcryptjs'

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