const spawn = require("child_process").spawn;
const UserTemplate = require("../model/updateDetails")
const {Data} = require("../../client/src/static/RequestFormData")
const activateAlgo = async (req, res) => {
  console.log("algorithm start", req.body);
  let url_script = "C:/Users/Yosef/Schedule-project/client/src/ScheduleAlgorithm/main.py"
  let url_cred = "C:/Users/Yosef/Schedule-project/client/src/ScheduleAlgorithm/scheduler-359321-2d5d4c4018a4.json"
  
  var all_res;

  function perpareExperiences(){
    all_exper = []
    all_res.forEach(element => {
      let username = await UserTemplate.findOne({ id: element['תעודת זהות']}).exec()
      if(username){
        exper = {
          'Group':,
          'Area':,
          'Department':,
          'Hospital':,
          'Address':{
            'City':,
            'Street':,
            'Number':
          },
          "Contact" : ,
          "PhoneNumber" : ,
          "Email" : ,
          "StartDate" : {
              "Year": ,
              "Month" : ,
              "Day" : 
          },
          "EndDate" : {
              "Year": ,
              "Month" : ,
              "Day" : 
          }
        }
        all_exper.push(exper)
      }
    });
  }
  const pythonProcess = spawn('python',[url_script,url_cred, "2>&1"]);
  pythonProcess.stdout.on('data', (data) => {
    // console.log("Data content - " + data.toString())
    all_res += JSON.parse(data);
   });

   pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    perpareExperiences();
  });
   

};

module.exports = {
    activateAlgo,
};
