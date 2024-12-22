import express from "express";
import { GetAllListings,GetListingsDetailsByID,BookProperty } from "../controllers/ListingController.js";

const ListingRouter = express.Router();

ListingRouter.get("/",GetAllListings)
ListingRouter.get("/:id",GetListingsDetailsByID)
ListingRouter.post("/bookings",BookProperty)

export default ListingRouter;