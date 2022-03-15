const express = require('express');
const mongoose = require('mongoose');

const PostMessage = require('../models/students.js');


const router = express.Router();

export const createPost = async (req, res) => {
    res.send("post creation")
    console.log("getting post to create")
    const { username, title, file } = req.body;
    console.log(req.body)

    const newPostMessage = new PostMessage({ username, title, file })

    try {
        await newPostMessage.save();
        console.log("creation complete")
        res.status(201).json(newPostMessage );
    } catch (error) {
        console.log("creation faild")
        res.status(409).json({ message: error.message });
    }
}