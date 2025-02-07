import express from 'express'
import { authenticateJWT } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/current', authenticateJWT, (req, res) => {
    res.json({ user: req.user })
})

export default router