const passport = require('passport')
const passportJwt = require('passport-jwt')
const JWT = require('jsonwebtoken')
const User = require('../model.js')

const jwtSecret = 'admin123'
const jwtAlgorithm = 'HS256'
const jwtExpiresIn = '3H'

passport.use(User.createStrategy())

passport.use(new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
}, (payload, done) => {
    User.findById(payload.sub).then((user) => {
        if (user) {
            user.token = payload
            done(null, user)
        } else {
            done(null, false)
        }
    }).catch((error) => {
        done(error, false)
    })
}))

const register = (req, res, next) => {
    
    User.register(new User({ email: req.body.email, role: 'student' }), req.body.password, (err, user) => {
        if (err) {
            return  res.status(500).send(err.message)
        }

        req.user = user
        next()
     })
}


const signJwtForUser = (req, res) => {
    const token = JWT.sign(
        {
            sub: req.user._id.toString(),
            email: req.user.email,
            role: req.user.role
        },
        jwtSecret,
        {
            algorithm: jwtAlgorithm,
            expiresIn: jwtExpiresIn
        }
    )

    res.json({ token: token })
}

module.exports = {
    initializePassport: passport.initialize(),
    requireJwt: passport.authenticate('jwt', { session: false }),
    login: passport.authenticate('local', { session: false }),
    register,
    signJwtForUser
}
