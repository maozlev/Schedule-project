const Experiences = require("../model/experience");
const { all } = require("../routes/routes");

const addExp = async (req, res) => {
  console.log("-- add exp admin");
  let expToAdd = req.body.newExp;
  console.log(6, expToAdd);
  let exp = await Experiences.create({
    UserName: expToAdd.UserName,
    Group: expToAdd.Group,
    Area: expToAdd.Area,
    Department: expToAdd.Department,
    Hospital: expToAdd.Hospital,
    Address: expToAdd.Address,
    Contact: expToAdd.Contact,
    PhoneNumber: expToAdd.PhoneNumber,
    Email: expToAdd.Email,
    StartDate: expToAdd.StartDate,
    EndDate: expToAdd.EndDate,
  }).then((ans, err) => {
    if (err) {
      console.log("Problem occured!\n" + err.toString());
    } else {
      console.log("One exp added to ", req.body.newExp.UserName);
    }
    res.status(200);
  });
};

module.exports = {
  addExp,
};
