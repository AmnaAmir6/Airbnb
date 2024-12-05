import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type:String,
            required:true,
            minLength: [6, "Password MUST be at least 6 characters long."]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
        },
        phoneNo: {
            type: String,
            required: true,
            minLength: [11, "Phone number MUST contain 11 digits."],
            maxLength: [11, "Phone number MUST contain 11 digits."]
        },
    },
    {
        timestamp:true,
    }
);

const User = mongoose.model('user',UserSchema);
export default User;