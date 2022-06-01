const { stringify } = require('uuid');
const experience = require('../model/experience');
const Experiences = require('../model/experience');
const { all } = require('../routes/routes');

const ExperiencesByUserForCalander = async (req, res) => {
    username = req.params.username;
    console.log("The user name is: " + username);

    var events = []
    var contacts = []
    try {
        const expr = await Experiences.find({ UserName: username });
        var ExperiencesArray = Object.keys(expr).map(
            function (key) {
                return expr[key];
            }
        );
        // Set event and contact for each experience 
        ExperiencesArray.forEach((exper) => {
            events.push({
                title: exper.Hospital + " - " + exper.Department,
                allDay: true,
                start: new Date(Date.UTC(exper.StartDate.Year, exper.StartDate.Month - 1, exper.StartDate.Day)),
                end: new Date(Date.UTC(exper.EndDate.Year, exper.EndDate.Month - 1, exper.EndDate.Day))
            })
            var contact = {
                Hospital: exper.Hospital,
                Department: exper.Department,
                Address: exper.Address.City + " " + exper.Address.Street + " " + exper.Address.Number ,
                Contact: exper.Contact,
                PhoneNumber: exper.PhoneNumber,
                Email: exper.Email
            }
            //Push just if this excatly contact aren't already exist in contacts array
            if(contacts.findIndex(obj => {
                return  obj.Hospital === contact.Hospital &&
                        obj.Department === contact.Department &&
                        obj.Address === contact.Address &&
                        obj.Contact === contact.Contact &&
                        obj.PhoneNumber === contact.PhoneNumber &&
                        obj.Email === contact.Email;})
                        == -1) // findIndex return -1 if doesn't exist
            contacts.push(contact)
        })
        res.status(200).json({ev:events, co:contacts})
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }
}

const ExperiencesByUserForAdmin = async (req, res) => {
    console.log("-- Start ExperiencesByUserForAdmin")
    username = req.params.username;
    console.log("user - " + username)
    Experiences.find({ UserName: username }).lean().exec(function(err,result){
        if(err){/*Handle errors*/} 
        if (result){
            console.log(result)
            res.status(200).send(result)
        }else{
            console.log("Not find this user")
            res.status(200).send(false)
        }
    });
}

module.exports = {
    ExperiencesByUserForCalander,
    ExperiencesByUserForAdmin
}