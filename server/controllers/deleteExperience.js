const Experiences = require('../model/experience');
const { all } = require('../routes/routes');

const deleteExp = async (req, res) => {
    console.log("-- Start deleteExp")
    var username = req.params.username;
    await Experiences.findOne({ UserName: username, 
                                Hospital : req.body.Hospital,
                                Department : req.body.Department,
                                StartDay : req.body.StartDay,
                                EndDay : req.body.EndDay},
                                (err, ans)=> {
                                    if(err){
                                        console.log("Problem occured!\n" + err.toString())
                                    } else{
                                        console.log("One document delete from database")
                                    }
                                    res.status(200)
                                }) 

}

module.exports = {
    deleteExp
}