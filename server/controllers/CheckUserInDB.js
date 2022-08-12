const UserTemplate = require("../model/updateDetails")

const isExist = async (req,res) => {
    const username = req.params.username
    const users = await UserTemplate.find({ UserName: username });
    if(users.length > 0){
        console.log("need to overide from check user in db")
        res.status(200).send(true)
    }else{
        console.log("put new user")
        res.status(200).send(false)
    }
}

module.exports = {
    isExist
}