import express from "express";

const ListingRouter = express.Router();

ListingRouter.get("/",(req,res)=>{
    res.send("Listing routes");
})

export default ListingRouter;