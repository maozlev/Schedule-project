const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const PORT = process.env.PORT || 3001; 

async function main(){ // connection to mongo DB

    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://maozlev:maoz6068804@cluster0.glgbm.mongodb.net/Students?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try{
        await client.connect();
        await listDatabases(client)
        }catch(e){
            console.error(e);
        }
        finally{
            await client.close();
        }
}

main().catch(console.error);

async function listDatabases(client){
    const DatabasesList = await client.db().admin().listDatabases();
    console.log("Mongo DB Databases:");
    DatabasesList.databases.forEach(db => {
        console.log(`-${db.name}`); 
    })
}


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

app.listen(PORT, ()=> {
    console.log("running on port " + PORT);
    
});


app.post("/api/insert" , (req, res)=> {
    const id = req.body.id;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const city = req.body.city;
    const year = req.body.year;
    const username = req.body.username;
    const sqlinsert = 
        "INSERT INTO students (id, FirstName, LastName, city, year, username) VALUES (?, ?, ?, ?, ?, ?);";
        db.query(sqlinsert,[id, FirstName, LastName, city, year, username] , (err, result) => {   
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
