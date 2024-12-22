import express from "express";
import { addlisting, deleteListing, getAllBookings, getAllListingsOfHost } from "../controllers/HostController.js";

const HostRouter = express.Router();

HostRouter.get("/listings",getAllListingsOfHost);
HostRouter.post("/lisitngs",addlisting);
HostRouter.delete("/lisitngs/:id",deleteListing);
HostRouter.get("/bookings",getAllBookings);


export default HostRouter;