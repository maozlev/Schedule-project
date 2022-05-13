const users = require('../model/updateDetails');
const { all } = require('../routes/routes');

const User = async (req, res) => {
    username = req.params.username;
    console.log("The user name is: " + username);
    try {
        const expr = await users.find({ UserName: username });
        console.log(expr.length)
        if(expr.length > 0){
            console.log("need to overide")
            res.status(204).json(events)
            return 
        }
        else{
            console.log("put new user")
            res.status(200).json(events)
            return 
        }
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }

}



module.exports = {
    User
}