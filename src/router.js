import express from 'express'
import { PrismaClient } from '../generated/prisma/index.js';
const router = express.Router();
const prisma = new PrismaClient()
router.get('/',async(req,res)=>{
    try {
        const users = await prisma.user.findMany()
        res.status(201).json(users)
    } catch (error) {
        console.log(error.message)
    }
    
})

router.post("/", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: 'elsa3@prisma.io',
                name: 'Elsa Prisma',
            },
        })
        res.status(201).json({message:"data  send sucessfully",user})
    } catch (error) {
        res.status(500).json({message:"internal error "})
        console.log(error.message)
    }
})

export default router;