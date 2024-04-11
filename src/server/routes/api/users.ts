import { Router } from 'express'
import db from '../../db';

const router = Router();


// GET /api/users/id
router.get('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id, 10)
        const user = await db.users.getOneUser(id)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

//GET /api/users/
router.get('/', async (req,res) => {
    try {
        const users = await db.users.getALLUsers()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

export default router;