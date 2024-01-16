import express from 'express';
import fetchUser from "./middleware/fetchUser.js";
import Notes from '../models/Notes.js';

const router=express.Router();
//ROUTE 1: Get Att the Notes using: GET "/api/notes/fetchallnotes".Login required
router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try {
        const notes =await Notes.find({user: req.userId});
        res.json(notes);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }



})





export default router