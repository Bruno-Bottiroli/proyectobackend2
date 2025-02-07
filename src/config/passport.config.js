import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import userModel from '../models/user.model.js'
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = 'secretitojeje'
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies?.token]), 
    secretOrKey: 'secretitojeje'
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = await userModel.findById(jwt_payload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}))

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
      token = req.cookies.token; 
  }
  return token
}

const opts = {
  jwtFromRequest: cookieExtractor, 
  secretOrKey: SECRET_KEY
}

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
      const user = await userModel.findById(jwt_payload.id)
      if (!user) {
          return done(null, false);
      }
      return done(null, user)
  } catch (error) {
      return done(error, false);
  }
}))


export default passport;