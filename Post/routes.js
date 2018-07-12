const express = require('express')
const router = express.Router()
const Post = require('./model')

const { canDestroy, canUpdate } = require('../User/Middleware/roles')
const { requireJwt } = require('../User/Middleware/auth')


// Create new post
router.post('/', requireJwt, (req, res) => {
    Post.create(req.body).then(
        // post => res.status(200).send(post)
         post => res.status(200).json(post)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// get all posts
router.get('/', requireJwt, (req, res) => {
    Post.find().then(
        post => res.json(post)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})



// Update post
router.put('/:id', requireJwt, canUpdate, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body).then(
        post => res.send(post)
    ).catch(
        error => res.status(500).json({ error: error.message })
    )
})



// Delete post
router.delete('/:id', requireJwt, canDestroy, (req, res) => {
    Post.findByIdAndRemove(req.params.id).then(
        () => res.sendStatus(204)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})



module.exports = router 
