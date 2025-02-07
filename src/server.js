import mongoose from 'mongoose'
import express from 'express'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import './config/passport.config.js'
import authRoutes from './routes/auth.routes.js'
import sessionsRoutes from './routes/session.routes.js'
import handlebars from 'express-handlebars'
import { __dirname } from "./dirname.js"
import path from "path"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())



const MONGO_URI = 'mongodb+srv://brunobottiroli7:mHzTCrtaqUy0Adl4@cluster0.r3kmo.mongodb.net/user'

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err))

app.use('/api/auth', authRoutes)
app.use('/api/sessions', sessionsRoutes)

app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      defaultLayout: "main",
    })
  );
  app.set("view engine", "hbs")
  app.set("views", path.join(__dirname, "views"))


  app.get("/", (req, res) => {
    res.render("home")
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Iniciar sesión" })
})

app.get("/register", (req, res) => {
  res.render("register", { title: "Registrarse" })
})
app.get("/profile", (req, res) => {
  res.render("profile", { title: "Perfil" })
});

app.listen(5000, () => {
    console.log('🚀 Servidor corriendo en http://localhost:5000')
})
