const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplate = require('../model/updateDetails')
const uploadpaper = require('../model/uploadpaper')

router.post('/update_details', async(req, res) => {
    
    const user = new signUpTemplate({
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

router.post('/papers', async(req, res) => {
    const paper = new uploadpaper({
        UserName: req.body.UserName,
        Data: req.body.FileAsData,
        Title: req.body.Title
    })
    paper.save()
    .then(data => {
        console.log("details update")
        console.log(data.Title)
        res.sendStatus(200)
    })
    .catch(error=> {
        console.log("problem accured")
        console.log(error)
        res.json(error)
    })
})

module.exports = router