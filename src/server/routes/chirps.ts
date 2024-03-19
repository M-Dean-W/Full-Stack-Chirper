import { Router } from 'express'
import db from '../db';
import insertMentions from '../services/insertMentions';

const router = Router();

// GET /api/chirps/id
router.get('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id, 10)
        const chirp = await db.chirps.getOneChirp(id)
        res.json(chirp)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

//GET /api/chirps/
router.get('/', async (req,res) => {
    try {
        const chirps = await db.chirps.getALLChirps()
        res.json(chirps)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

//POST /api/chirps/
router.post('/', async (req,res) => {
    try {
        const { user_id, body, location } = req.body
        const chirpResult = await db.chirps.insertChirp(user_id, body, location || '')
        await insertMentions(body, chirpResult.insertId)
        res.json({ message:'chirp created', id:chirpResult.insertId})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal Server Error', error})
    }
});

// PUT /api/chirps/id
router.put("/:id", async (req, res) => {
    try {
        const { user_id, body, location } = req.body;
        const id = Number(req.params.id);
        await db.chirps.updateChirp(user_id, body, location, id);
        await insertMentions(body,id)
        res.status(200).json({ message: "Chirp updated successfully" });
    } catch (error) {
        console.error("Error updating chirp:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE /api/chirps/id
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db.mentions.deleteForChirp(id)
        await db.chirps.deleteChirp(id);
        res.status(200).json({ message: "Chirp deleted successfully" });
    } catch (error) {
        console.error("Error deleting chirp:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/mentions/:user_id', async (req, res) => {
    const user_id = parseInt(req.params.user_id, 10);

    if (isNaN(user_id)) {
        return res.status(400).json({ message: "User ID must be a number" });
    }

    try {
        const mentionedChirps = await db.chirps.getMentions(user_id);
        res.status(200).json(mentionedChirps);
    } catch (error) {
        console.error("Error getting mentions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;