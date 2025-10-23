import express from 'express'
import { PrismaClient } from '../generated/prisma/index.js';
const router = express.Router();
const prisma = new PrismaClient()
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'asc'
            }
        })
        res.status(201).json(users)
    } catch (error) {
        console.log(error.message)
    }

})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const users = await prisma.user.findMany()
        const data = users.filter((item) => item.id === id)
        res.status(201).json(data)
    } catch (error) {
        console.log(error.message)
    }

})



router.post("/", async (req, res) => {
    const { email, name } = req.body;
    try {
        const user = await prisma.user.createMany({
            data: [
                email,name
            ]
            ,
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: "internal error " })
        console.log(error.message)
    }
})

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const { name, email } = req.body;
    try {
        const updateUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                ...(name && { name }),
                ...(email && { email })
            },
        })
        res.status(200).json(updateUser)
    } catch (error) {
        console.log(error.message)
    }
})

router.delete("/:id", async (req, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const updateUser = await prisma.user.delete({
            where: {
                id
            }
        })
        res.status(200).json(updateUser)
    } catch (error) {
        console.log(error.message)

    }

})

export default router;