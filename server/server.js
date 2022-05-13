const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeUrls = require('./routes/routes')
// app.use(bodyParser.urlencoded({extended: true}));
const ExperiencesController = require('./controllers/ExperiencesController')
const UsersController = require('./controllers/UsersController')
const CheckUserInDB = require('./controllers/CheckUserInDB')


dotenv.config()

mongoose.connect(process.env.DATABASE, ()=> console.log("MongoDB connected"))

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use('/api', routeUrls)

app.get("/api/MyExperience/:username", ExperiencesController.ExperiencesByUser)
app.get("/api/checkisExist/:username", CheckUserInDB.isExist)

app.get("/api/update_details/:username", UsersController.User)

app.listen(3001, ()=> {
    console.log("running on port 3001");
    
});

