const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require('express-session')

const db = mysql.createPool({
    host: "siud.cb93e6tdxenj.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "siud",
    password: "Maoz6068804!",
    database: "siud",
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser('secret'));
app.use(session({cookie: {maxAge: null}}));


app.listen(3001, ()=> {
    console.log("running on port 3001");
    
});

app.post("/api/insert" , (req, res)=> {
    const id = req.body.id;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const city = req.body.city;
    const year = req.body.year;
    const sqlinsert = 
        "INSERT INTO students (id, FirstName, LastName, city, year) VALUES (?, ?, ?, ?, ?);";
        db.query(sqlinsert,[id, FirstName, LastName, city, year] , (err, result) => {   
            console.log(req.body);
            if(err === null){
                console.log("update details succesfully.");
                res.send(200)
            }
           else{
                console.log(err);
                res.send(err);
           }     
        });
});
