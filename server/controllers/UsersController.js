const users = require('../model/updateDetails');
const { all } = require('../routes/routes');

const User = async (req, res) => {
    username = req.params.username;
    console.log("The user name is: " + username);
    try {
        const expr = await users.find({ UserName: username });
        console.log(expr.length)
        if (expr.length > 0) {
            console.log("need to overide from user controller")
            res.status(204).json(events)
            return
        }
        else {
            console.log("put new user")
            res.status(200).json(events)
            return
        }
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }
}
const AllUsers = async (req, res) => {
    try {
        const RawAllUsers = await users.find({});
        var AllUsers = Object.keys(RawAllUsers).map(
            function (key) {
                return RawAllUsers[key];
            }
        );
        res.status(200).json({ AllUsers })
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }
}




module.exports = {
    User,
    AllUsers
}