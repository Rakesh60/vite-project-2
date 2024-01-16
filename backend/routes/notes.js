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
//* Route2: Add new Notes using Post
router.post('/addnote',fetchUser,async(req,res)=>{
    try {
        // data coming from (frontend)
        const {title,description,tag}=req.body;
        // VAlidation 
        if(!title || !description || !tag){
            return res.status(400).json({error:"All Fields Are Required"});
        }

        const notes =await Notes({
            title,
            description,
            tag,
            user:req.userId
        })

        //Saving notes
        const saveNote=await notes.save();
        res.json(saveNote);
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})





export default router