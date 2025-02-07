import express from 'express'
import userModel from '../models/userModel.js'
import { hashPassword } from '../utils/encrypt.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

       
        const hashedPassword = hashPassword(password)

        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser })
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message })
    }
});

export default router;