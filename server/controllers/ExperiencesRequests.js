const requestForm = require('../model/requestForm.js');

const AddRequest = async (req, res) => {
        var ExperiencesRequest = []
  
        const requests = new requestForm({
            UserName: req.body.UserName,
            Requests: req.body.Final
        })
        requests.save()
        .then(data => {
            console.log("details update")
            res.sendStatus(200)
        })
        .catch(error=> {
            console.log("problem accured")
            res.json(error)
        })
    }


module.exports = {
    AddRequest
}