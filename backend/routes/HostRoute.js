import express from "express";
import { addlisting, deleteListing, getAllBookings, getAllListingsOfHost, getProfile } from "../controllers/HostController.js";

const HostRouter = express.Router();

HostRouter.get("/listings",getAllListingsOfHost);
HostRouter.post("/listings",addlisting);
HostRouter.delete("/listings/:id",deleteListing);
HostRouter.get("/bookings",getAllBookings);
HostRouter.get("/profile",getProfile)


export default HostRouter;