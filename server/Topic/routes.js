const express = require('express')
const router = express.Router()
const Topic = require('./model')

const { canDestroyTopic, canUpdate } = require('../User/Middleware/roles')
const { requireJwt } = require('../User/Middleware/auth')


// Create new topic
router.post('/', requireJwt, (req, res) => {
    Topic.create(req.body).then(
        bookmark => res.status(200).send(bookmark)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})

// get all topics
router.get('/', requireJwt, (req, res) => {
    Topic.find().then(
        topic => res.json(topic)
    ).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})



// Update topic
router.put('/:id', requireJwt, canUpdate, (req, res) => {
    Topic.findByIdAndUpdate(req.params.id, req.body).then(
        topic => res.send(topic)
    ).catch(
        error => res.status(500).json({ error: error.message })
    )
})



// Delete topic
router.delete('/:id', requireJwt, canDestroyTopic, (req, res) => {
    Topic.findByIdAndRemove(req.params.id).then(() => {
        
        Topic.remove({ parentId: req.params.id }, function (err, response) {
            // console.log('remove was triggered')
            // console.log(req.params.id)   
         })
        
    }).then(() => {
        () => res.sendStatus(204)
    }).catch(
        error => res.status(500).json({
            error: error.message
        })
    )
})



module.exports = router 
