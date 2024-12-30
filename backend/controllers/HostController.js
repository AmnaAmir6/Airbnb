import Host from "../models/Host.js";

export const getAllListingsOfHost =async(req,res)=>{
    const {username}=req.query;
    console.log(`GetListings od Host function for `, username);
    try {
        const host = await Host.findOne({ "username": username });

        if (!host) {
            return { error: "host not found" };
        }

        const property = host.properties;
        console.log(`\nListing ${username}: ${property}`);
        res.status(200).json({ success: true, property });
    } catch (error) {
        res.status(404).json({ success: false, message: "could not find listing of this username" });
    }
}

export const addlisting =async(req,res)=>{
    const {username,title,type,category,price,rating,guests,bedrooms,bathrooms,image,ameneties}=req.body;
    console.log(`Add Listings function`);
    try {
        const host = await Host.findOne({ "username": username });

        if (!host) {
            return res.status(400).json({ error: "host not found" });
        }

        console.log("host :",host);

        const property = {
            title,
            type,
            bedrooms,
            bathrooms,
            guests,
            rating,
            image,
            category,
            price,
            ameneties
        }

        host.properties.push(property)
        await host.save();

        console.log("prperty created successfully");
        res.status(201).json({ success: true, property });
    } catch (error) {
        res.status(404).json({ success: false, message: "could not find listing of this id" });
}
}

export const deleteListing = async (req, res) => {
    const { id } = req.params;

    try {
        const host = await Host.findOne({ "properties._id": id });

        if (!host) {
            return { error: "host not found" };
        }

        host.properties = host.properties.filter(property => property._id.toString() !== id);

        await host.save();

        res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ success: false, message: "Failed to delete property" });
    }
};

export const getProfile= async (req, res) => {
    const { username } = req.query;
    try {
      const host = await Host.findOne({ username });
      if (!host) {
        return res.status(404).json({ success: false, message: "username not found" });
      }
      res.status(200).json({
        username: host.username,
        email: host.email,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "something went wrong" });
    }
  }
  

export const getAllBookings =async(req,res)=>{
    const { username } = req.query;
    try {
      const host = await Host.findOne({ username });
      if (!host) {
        return res.status(404).json({ success: false,error: "Host not found" });
      }
      const bookings = host.properties
            .filter((property) => property.bookings && property.bookings.length > 0) 
            .map((property) => 
                property.bookings.map((booking) => ({
                    username:booking.username,
                    checkInDate:booking.checkInDate,
                    checkOutDate:booking.checkOutDate,
                    propertyTitle: property.title 
                }))
            )
            .flat();

      return res.status(200).json({success:true,bookings});
    
    } catch (error) {
      res.status(500).json({success: false, error: "Something went wrong" });
    }
}
