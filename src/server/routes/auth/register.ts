import { Router } from "express";

const router = Router();

router.post('/', async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        res.json({ email, password })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

export default router