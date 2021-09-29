const express = require('express');
const router = express.Router();

const Tele = require('../models/Post');

 // post index route
router.get('/', async (req, res) => {
    try {
        const posts = await Tele.all
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

// Post shown by id route
router.get('/:id', async (req, res) => {
    try {
        const post = await Tele.findById(parseInt(req.params.id))
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create post route
router.post('/', async (req, res) => {
    try {
        const post = await Tele.create(req.body.title, req.body.author, req.body.story)
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})



module.exports = router;