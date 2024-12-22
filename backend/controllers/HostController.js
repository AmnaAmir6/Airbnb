import Host from "../models/Host.js";

export const getAllListingsOfHost =async(req,res)=>{
    const {id}=req.body;
    console.log(`GetListings od Host function`);
    try {
        const host = await Host.findOne({ "_id": id });

        if (!host) {
            return { error: "host not found" };
        }

        const property = host.properties;
        console.log(`\nListing ${id}: ${property}`);
        res.status(200).json({ success: true, property });
    } catch (error) {
        res.status(404).json({ success: false, message: "could not find listing of this id" });
    }
}

export const addlisting =async(req,res)=>{
    const {id,title,type,category,price,rating,guests,bedrooms,bathrooms,image}=req.body;
    console.log(`Add Listings function`);
    try {
        const host = await Host.findOne({ "_id": id });

        if (!host) {
            return { error: "host not found" };
        }

        const property = {
            title,
            type,
            bedrooms,
            bathrooms,
            guests,
            rating,
            image,
            category,
            price
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

        host.properties = host.properties.filter(property => property._id.toString() !== propertyId);

        await host.save();

        res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ success: false, message: "Failed to delete property" });
    }
};


export const getAllBookings =async(req,res)=>{
    
}