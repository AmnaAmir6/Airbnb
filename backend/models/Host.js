import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },

});

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        unique: true
    },

    image: String,
    guests: Number,
    bedrooms: Number,
    bathrooms: Number,
    price: Number,
    category: String,
    rating: Number,
    bookings: [bookingSchema],

});

const hostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
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
    properties: [propertySchema],
},
    {
        timestamp: true,
    }
);

const Host = mongoose.model('Host',hostSchema);
export default Host;
