import fs from 'fs/promises'

export const GetAllListings=async(req,res,next)=>{
    console.log("GetAllListings function");
    try{
        const data = await fs.readFile("./movieListing.json","utf-8");
        const listings = JSON.parse(data);
        res.status(200).json({success:true,listings});
    }
    catch{
        res.status(500).json({success:false,message:"could not fetch lisiting data"});
    }
    next();
}

export const GetListingsDetailsByID=async(req,res,next)=>{
    const { id } = req.params;
    console.log(`GetListingsDetails by ID ${id} function`);
    
    try{
        const data = await fs.readFile("./movieListing.json","utf-8");
        const listings = JSON.parse(data);
        //console.log("listings: ",listings);
        const result = listings.find((listing) => listing.id === parseInt(id));
        if(result){
            console.log(`\nListing ${id}: ${result}`);
            res.status(200).json({success:true,result});
        }
        else{
            res.status(404).json({ success: false, message: "could not find listing of this id" });
        }
    }
    catch{
        res.status(500).json({success:false,message:"could not fetch lisiting data"});
    }
    next();
}

export const BookProperty=async(req,res,next)=>{
    console.log("BookProperty function");
    const booking = req.body; 
    console.log('Booking created:', booking);
    res.status(201).json({ success: true, message: "Booking created successfully"});
    next();
}

export const LisitingQueries=async(req,res,next)=>{
    console.log("LisitingQueries function");
    const{query}=req.query;
    try{
        const data = await fs.readFile("./movieListing.json","utf-8");
        const listings = JSON.parse(data);
        const result = listings.filter((listing) => listing.category.toLowerCase().includes(query.toLowerCase()));
        
        res.status(200).json({success:true,result});
    }
    catch{
        res.status(500).json({success:false,message:"could not fetch lisiting data"});
    }
    next();
}