import User from "../models/User.js";
import Host from "../models/Host.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const CreateUser = async (req, res) => {
    const { username, password, email, phoneNo, role } = req.body;
        console.log(username, password, email, phoneNo, role);
    try {
        if (role === 'user') {
            const existingUserName = await User.findOne({ username });
            console.log(existingUserName);
            if (existingUserName) {
                console.log("Username already exists");
                return res.status(400).send("Username already exists");
            }

            const existingUserEmail = await User.findOne({ email });
            if (existingUserEmail) {
                console.log("User email already exists");
                return res.status(400).send("User Email already exists");
            }

            const hashPassword = await bcrypt.hash(password, 12);
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
        else {
            const existingHostName = await Host.findOne({ username });
            console.log(existingHostName);
            if (existingHostName) {
                console.log("Username already exists");
                return res.status(400).send("Username already exists");
            }

            const existingHostEmail = await Host.findOne({ email });
            if (existingHostEmail) {
                console.log("User email already exists");
                return res.status(400).send("User Email already exists");
            }

            const hashPassword = await bcrypt.hash(password, 12);
            const host = new Host({
                username,
                password: hashPassword,
                email,
                phoneNo
            })
            console.log("host created");
            await host.save();
            res.status(201).json(host);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong ,unable to register");
    }
}

export const LoginUser = async (req, res) => {
    const { username, password, role } = req.body;
        console.log(username, password);
    try {
        
        if (role === 'user') {
            const user = await User.findOne({ username });
            console.log(user);
            if (!user) {
                console.log("User does not exists");
                return res.status(400).send("User does not exists");
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                console.log("Incorrect User password");
                return res.status(400).send("Incorrect User password");
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            console.log("User logged in");
            res.status(201).json({ user, token });
        }
        else {
            const host = await Host.findOne({ username });
            console.log(host);
            if (!host) {
                console.log("Host does not exists");
                return res.status(400).send("Host does not exists");
            }

            const isCorrectPassword = await bcrypt.compare(password, host.password);
            if (!isCorrectPassword) {
                console.log("Incorrect host password");
                return res.status(400).send("Incorrect host password");
            }

            const token = jwt.sign({ id: host._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            console.log("Host logged in");
            res.status(201).json({ user:host, token });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong ,unable to log in");
    }
}

export const LoginBackUser=async(req,res)=>{
    console.log("Into login back func")
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const Expired = Date.now()>=decoded.exp*1000;
        if(Expired)
        {
            req.status(401).send("Token Expired");
        }
        console.log(token);

        const user = await User.findById(decoded.id);
        res.status(200).json({user});
    }
    catch(error){
        console.log(error);
        res.status(500).send("something went wrong");
    }
}