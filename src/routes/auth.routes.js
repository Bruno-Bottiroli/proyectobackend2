import express from 'express'
import userModel from '../models/user.model.js'
import { hashPassword } from '../utils/encrypt.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const router = express.Router()

const SECRET_KEY = 'secretitojeje'

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' })
        }
        const hashedPassword = hashPassword(password)

        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        })

        res.redirect('/login')
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' })
        }

        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' })
        }
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

       
        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 3600000 
        });

        res.redirect('/profile');
    } catch (error) {
        res.status(500).json({ error: 'Error en el login'})
    }
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login')
    });
});


export default router