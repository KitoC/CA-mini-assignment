const express = require('express')
const router = express.Router()
const User = require('./model')

const { isAdmin } = require('./Middleware/roles')
const { requireJwt, register, signJwtForUser, login } = require('./Middleware/auth')


// Middleware for roles/authorization


// Login
router.post('/login', login, signJwtForUser)

// logout
router.get('/logout', (req, res) => {
    req.logout()
    res.status(200).send('User has logged out successfully')
})

router.get('/', requireJwt, (req, res) => {
    User.find().then(
        user => res.json(user)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// Register
router.post('/register', register, signJwtForUser)

// Profile
router.get('/profile', requireJwt, (req, res) => {
    res.status(200).send('Profile')
})

// Admin
router.get('/admin', requireJwt, isAdmin, (req, res) => {
    res.status(200).send('Admin')
})


module.exports = router
