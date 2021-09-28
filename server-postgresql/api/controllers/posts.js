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
        const post = await Tele.create(req.body.title, req.body.author, req.body.messagePost)
        res.json(post)
    } catch(err) {
        res.status(404).json({err})
    }
})

// // dogs update route
// router.patch('/:id', async (req, res) => {
//     try {
//         const dog = await Dog.findById(parseInt(req.params.id))
//         const updatedDog = await dog.update(req.body.name, req.body.age)
//         res.json({dog: updatedDog})
//     } catch(err) {
//         res.status(500).json({err})
//     }
// })

// // delete dog route
// router.delete('/:id', async (req, res) => {
//     try {
//         const dog = await Dog.findById(parseInt(req.params.id))
//         await dog.destroy()
//         res.status(204).json('Dog deleted')
//     } catch(err) {
//         res.status(500).json({err})
//     }
// })


module.exports = router;