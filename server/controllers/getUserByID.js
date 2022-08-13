const UserTemplate = require("../model/updateDetails")

const getUser = async (req,res) => {
    const _id = req.params.id
    UserTemplate.findOne({ id: _id })
        .lean()
        .exec(function (err, result){
            if(err){/*Handle errors*/} 
            if (result){
                // console.log("found user with id ==="+ result.id)
                res.status(200).send(result)
            }else{
                console.log("Not find this user")
                res.status(200).send(false)
            }
        })
    }
module.exports = {
    getUser
}