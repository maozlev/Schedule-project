const configuration = require("../model/configuration");

const checkUpdate = async (req, res) => {
  const checkUpdate = await configuration.find();
  if(checkUpdate[0].value){
      console.log("can update")
      res.status(200).send(true)
  }else{
      console.log("update close")
      res.status(200).send(false)
  }
};

module.exports = {
  checkUpdate,
};
