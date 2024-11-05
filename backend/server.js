//const express=require('express');
import express from 'express'
const port =8880;

const app=express();

app.listen(port,()=>{
    console.log(`server running on port ${port}.`);
})