import Host from "../models/Host.js";
import User from "../models/User.js";

export const GetAllListings = async (req, res) => {
    console.log("GetAllListings function");
    try {
        const Hosts = await Host.find();

        const properties = Hosts.flatMap((host) =>
            host.properties.flatMap((property) =>
            ({
                id:property._id,
                title: property.title,
                category: property.category,
                type: property.type,
                image: property.image,
                guests: property.guests,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                price: property.price,
                rating: property.rating,
                bookings: property.bookings,
                amenities:property.amenities
            }))
        );
        //console.log("properties ",properties);
        res.status(200).json({ success: true, listings: properties });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


export const GetListingsDetailsByID = async (req, res) => {
    const { id } = req.params;
    console.log(`GetListingsDetails by ID ${id} function`);
    try {
        const host = await Host.findOne({ "properties._id": id });

        if (!host) {
            return { error: "Property not found" };
        }

        const property = host.properties.id(id);

        if (!property) {
            return { error: "Property not found in the host's properties" };
        }

        console.log(`\nListing ${id}: ${property}`);
        res.status(200).json({ success: true, listing:property });
    } catch (error) {
        res.status(404).json({ success: false, message: "could not find listing of this id" });
    }
}

export const BookProperty = async (req, res) => {
    const { id, checkInDate, checkOutDate, username } = req.body;
    
    console.log(`BookProperty function for property ID: ${id}`);

    try {
        // Find the host who owns the property
        const host = await Host.findOne({ "properties._id": id });

        if (!host) {
            return res.status(404).json({ error: "Property not found" });
        }

        // Retrieve the specific property from the host's properties array
        const property = host.properties.id(id);

        if (!property) {
            return res.status(404).json({ success:false,error: "Property not found in the host's properties" });
        }

        console.log(`\nListing ${id}: ${property.title}`);

        // Find the user by username
        const user = await User.findOne({ "username":username });

        if (!user) {
            console.log("user not found");
            return res.status(404).json({success:false, error: "User not found" });
        }

        console.log("User found:", user.username);
        
        const isBooked = property.bookings.some(booking => {
            return (
                (new Date(booking.checkInDate) <= new Date(checkOutDate)) &&
                (new Date(booking.checkOutDate) >= new Date(checkInDate))
            );
        });

        if (isBooked) {
            return res.status(400).json({ message: "The property is already booked during these dates." });
        }

        
        const booking = {
            username,
            userId: user._id,
            checkInDate,
            checkOutDate,
        };

        property.bookings.push(booking);

        await host.save();

        console.log(`Booking created for property ID ${id}`);

        res.status(201).json({ success: true, booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Could not book the property" });
    }
};


export const LisitingQueries = async (req, res, next) => {
    console.log("LisitingQueries function");
    const { query } = req.query;
    try {
        const data = await fs.readFile("./propertyListing.json", "utf-8");
        const listings = JSON.parse(data);
        const result = listings.filter((listing) => listing.category.toLowerCase().includes(query.toLowerCase()));

        res.status(200).json({ success: true, result });
    }
    catch {
        res.status(400).json({ success: false, message: "could not fetch lisiting data" });
    }
    next();
}