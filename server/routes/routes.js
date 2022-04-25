const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplate = require('../model/updateDetails')
const uploadpaper = require('../model/uploadpaper')
const multer = require('multer')

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

var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/papers', urlencodedParser, async(req, res) => {
    console.log(req.body.UserName)
    console.log("#############################################")
    const paper = new uploadpaper({
        UserName: req.body.UserName,
        file: req.body.FormData.myFile 
    })
    paper.save()
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

module.exports = router