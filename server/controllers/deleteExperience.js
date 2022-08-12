const Experiences = require("../model/experience");
const { all } = require("../routes/routes");

const deleteExp = async (req, res) => {
  console.log("-- Start deleteExp");
  console.log(6, req.body);
  console.log(Experiences.collection);
  let exp = await Experiences.deleteOne({ _id: req.body._id }).then
  ((ans, err) => {
    if (err) {
      console.log("Problem occured!\n" + err.toString());
    } else {
      console.log("One document delete from database");
    }
    res.status(200);
  });
};

module.exports = {
  deleteExp,
};
