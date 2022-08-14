
const activateAlgo = async (req, res) => {
  console.log("algorithm start", req.body);
//   .then((ans, err) => {
//     if (err) {
//       console.log("Problem occured!\n" + err.toString());
//     } else {
//       console.log("One exp added to ", req.body.newExp.UserName);
//     }
//     res.status(200);
//   });
};

module.exports = {
    activateAlgo,
};
