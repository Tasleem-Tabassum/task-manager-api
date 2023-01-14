const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({ 
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    var limit = 0, skip = 0
    const sort = {}

    const filter = {
        owner: req.user._id
    }

    if(req.query.completed){
        filter.completed = req.query.completed === 'true'
    }

    if(req.query.limit || req.query.skip) {
        limit = req.query.limit,
        skip = req.query.skip
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        const task = await Task.find(filter).sort(sort).limit(limit).skip(skip)
        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        //const task = await Task.findById(_id)
        
        const task = await Task.findOne({ _id, owner: req.user._id })

        if(!task){
            return res.status(404).send('Task not found')
        }
        res.status(200).send(task)
    }catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdates = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdates){
        return res.status(400).send({ 'error': 'Invalid Updates'})
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!task){
            return res.status(404).send('Task not found')
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }

        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router