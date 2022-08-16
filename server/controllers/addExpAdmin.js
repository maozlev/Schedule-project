const { json } = require("body-parser");
const Experiences = require("../model/experience");
const UserTemplate = require("../model/updateDetails")
const { all } = require("../routes/routes");

const addExp = async (req, res) => {
  console.log("-- add exp admin");
  let expToAdd = req.body.newExp;
  console.log(6, expToAdd);
  let usernameToAdd;
  await UserTemplate.findOne({id:parseInt(expToAdd.UserName)})
  .then((result)=>{
      usernameToAdd =  result.UserName
    }
  )

  let exp = await Experiences.create({
    UserName: usernameToAdd,
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
      console.log("One exp added to ", ans.UserName);
    }
    res.status(200);
  });
};

module.exports = {
  addExp,
};
