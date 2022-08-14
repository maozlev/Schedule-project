const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routeUrls = require('./routes/routes')
const ExperiencesController = require('./controllers/ExperiencesController')
const UsersController = require('./controllers/UsersController')
const CheckUserInDB = require('./controllers/CheckUserInDB')
const GetConfiguration = require('./controllers/getConfiguration')
const GetUserByID = require('./controllers/getUserByID')
const deleteExperience = require('./controllers/deleteExperience')
const addExpAdmin = require('./controllers/addExpAdmin')
const GetAllDocuments = require('./controllers/getAllDocuments')
const ExperiencesRequests = require('./controllers/ExperiencesRequests')
const activateAlgo = require('./controllers/activateAlgo')


dotenv.config()

mongoose.connect(process.env.DATABASE, ()=> console.log("MongoDB connected"))

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use('/api', routeUrls)

app.get("/api/MyExperienceCalander/:username", ExperiencesController.ExperiencesByUserForCalander)
app.get("/api/MyExperienceAdmin/:username", ExperiencesController.ExperiencesByUserForAdmin)

app.get("/api/checkisExist/:username", CheckUserInDB.isExist)
app.get("/api/getUserByID/:id", GetUserByID.getUser)
app.get("/api/update_details/:username", UsersController.User)
app.get("/api/getAllUsers",UsersController.AllUsers)
app.get("/api/getConfiguration", GetConfiguration.isAvaliable)
app.post("/api/deleteExperience/:username", deleteExperience.deleteExp)
app.post("/api/addExp/:username", addExpAdmin.addExp)
app.post("/api/SubmitExperienceRequests", ExperiencesRequests.AddRequest)
app.post("/api/activateAlgo", activateAlgo.activateAlgo)
app.get("/api/getAllDocuments", GetAllDocuments.getDocs)
app.get("/api/downloadDoc", GetAllDocuments.getDocAsBase64)


app.listen(3001, ()=> {
    console.log("running on port 3001");
    
});

