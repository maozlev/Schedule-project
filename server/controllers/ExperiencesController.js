const Experiences = require('../model/experience');
const { all } = require('../routes/routes');

const ExperiencesByUser = async (req, res) => {
    username = req.params.username;
    console.log("The user name is: " + username);

    var events = []
    try {
        const expr = await Experiences.find({ UserName: username });
        var ExperiencesArray = Object.keys(expr).map(
            function (key) {
                return expr[key];
            }
        );
        ExperiencesArray.forEach((exper) => {
            events.push({
                title: exper.Hospital + " - " + exper.Department,
                allDay: true,
                start: new Date(Date.UTC(exper.StartDate.Year, exper.StartDate.Month - 1, exper.StartDate.Day)),
                end: new Date(Date.UTC(exper.EndDate.Year, exper.EndDate.Month - 1, exper.EndDate.Day))
            })

        })
        res.status(200).json(events)
    } catch (error) {
        console.log("ERROR");
        res.status(404).json(error)
    }
}

module.exports = {
    ExperiencesByUser
}