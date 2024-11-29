import express from "express";

const AdminRouter = express.Router();

AdminRouter.get("/",(req,res)=>{
    res.send("Admin routes");
})

export default AdminRouter;