const configuration = require("../model/configuration")

const isAvaliable = async (req,res) => {
    const answer = await configuration.findOne({ target: "IsAvaliableToUpdate" });
    console.log("-- The state of update details is : " + JSON.stringify(answer.value))
    res.status(200).send(answer)
}
// const AdminsArray = async (req,res) => {
//     const answer = await configuration.findOne({ target: "AdminsArray" });
//     console.log("-- The admins array is : " + JSON.stringify(answer.value))
//     res.status(200).send(answer)
// }

module.exports = {
    isAvaliable
    // AdminsArray
}