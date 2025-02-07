import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken
    if (!token) {
        return res.redirect('/login')
    }

    try {
        const decoded = jwt.verify(token, 'secreto')
        req.user = decoded
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
};


router.get('/profile', verifyToken, (req, res) => {
    res.render('profile', { user: req.user })
})

export default router
