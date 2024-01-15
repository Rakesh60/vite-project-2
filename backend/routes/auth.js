import express from 'express';

const router=express.Router();

router.get('/',(req,res)=>{
    const obj={
        name:'Rakesh Kumar',
        rollnumber:25,
        branch:'CSE'
    }
 res.json(obj);
})
router.get('/login',(req,res)=>{
 res.send("Hello LOGIN");
})


export default router