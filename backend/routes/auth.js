import express from 'express';

const router=express.Router();
import User from '../models/user.js'

router.post('/',(req,res)=>{
    console.log('req.body')
})

export default router