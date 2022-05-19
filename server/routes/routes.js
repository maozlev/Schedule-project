const { response } = require('express')
const express = require('express')
const router = express.Router()
const updateDetails = require('../model/updateDetails')
const uploadpaper = require('../model/uploadpaper')

router.post('/createUser', async(req, res) => {
    
    const user = new updateDetails({
        UserName: req.body.UserName,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        id: req.body.id,
        city: req.body.city,
        year: req.body.year
    })
    user.save()
    .then(data => {
        console.log("details update")
        console.log(data)
        res.sendStatus(200)
    })
    .catch(error=> {
        console.log("problem accured")
        console.log(error)
        res.json(error)
    })
})


router.post('/setUserDetails', async(req, res) => {
    const filter = { UserName: req.body.UserName }
    const update = {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    id: req.body.id,
                    city: req.body.city,
                    year: req.body.year
                    }
    let doc = await updateDetails.findOneAndUpdate(filter, update)
    .then(data => {
        console.log("details update")
        console.log(data)
        res.sendStatus(200)
    })
    .catch(error=> {
        console.log("problem accured")
        console.log(error)
        res.json(error)
    })
})

router.post('/papers', async(req, res) => {
    const paper = new uploadpaper({
        UserName: req.body.UserName,
        Data: req.body.FileAsData,
        Title: req.body.Title,
        Subject: req.body.Subject
    })
    paper.save()
    .then(data => {
        console.log(`The file ${data.Title} upload as ${data.Subject} to DB successfully`)
        res.sendStatus(200)
    })
    .catch(error=> {
        console.log("problem accured")
        console.log(error)
        res.json(error)
    })
})

module.exports = router