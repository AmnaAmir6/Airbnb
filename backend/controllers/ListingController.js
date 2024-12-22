import Host from "../models/Host.js";

export const GetAllListings = async (req, res) => {
    console.log("GetAllListings function");
    try {
        const Hosts = await Host.find();

        const properties = Host.flatMap((host) =>
            host.properties.flatMap((property) =>
            ({
                title: property.tilte,
                category: property.category,
                type: property.type,
                image: property.image,
                guests: property.guests,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                price: property.price,
                rating: property.rating,
                bookings: property.bookings
            }))
        );
        res.status(200).json({ success: true, data: properties });

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
        res.status(200).json({ success: true, property });
    } catch (error) {
        res.status(404).json({ success: false, message: "could not find listing of this id" });
    }
}

export const BookProperty = async (req, res) => {
    const { id,checkInDate,checkOutDate,username,userId } = req.body;
    
    console.log(`GetListingsDetails by ID ${is} function`);
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

        const booking = {
            username,
            userId,
            startingDate: checkInDate,
            endingDate: checkOutDate,
          };
      
          property.bookings.push(booking);
      
          await host.save();
      
          console.log(`Booking created for property ID ${id}`);
        res.status(201).json({ success: true, booking });
    } catch (error) {
        res.status(404).json({ success: false, message: "could not book the property" });
    }
}

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