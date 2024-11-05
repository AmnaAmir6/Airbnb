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
    console.log("GetListingsDetails function");
    next();
}

export const BookProperty=async(req,res,next)=>{
    console.log("BookProperty function");
    next();
}