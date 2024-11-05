//const express=require('express');
import express from 'express'
import { BookProperty, GetAllListings, GetListingsDetailsByID, LisitingQueries } from "./PropertyController.js";
const port =8880;

const app=express();

app.get('/api/listing',GetAllListings);
app.get('/api/listing/:id',GetListingsDetailsByID);
app.post("/api/bookings",BookProperty);
app.get('/api/listings/search',LisitingQueries);
// Search functionality (basic filter using static data): GET/api/listings/search?query=<location>

app.listen(port,()=>{
    console.log(`server running on port ${port}.`);
})