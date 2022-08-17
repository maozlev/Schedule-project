const spawn = require("child_process").spawn;
const UserTemplate = require("../model/updateDetails");
const Experiences = require("../model/experience");

const foo = async (un, e, ch) => {
  name_phone_mail = e["איש קשר אחראי " + ch].split(";");
  start_end = e["תאריכים " + ch].split("-");
  start_date_DMY = start_end[0].split(".");
  end_date_DMY = start_end[1].split(".");

  let exper = {
    UserName: un,
    Group: e["התנסות " + ch],
    Area: e["התנסות " + ch],
    Department: e["התנסות " + ch],
    Hospital: e["בית חולים " + ch],
    Address: {
      City: "check",
      Street: "check",
      Number: "check",
    },
    Contact: name_phone_mail[0],
    PhoneNumber: name_phone_mail[1],
    Email: name_phone_mail[2],
    StartDate: {
      Year: "20" + start_date_DMY[2],
      Month:
        parseInt(start_date_DMY[1]) < 10
          ? "0" + start_date_DMY[1]
          : start_date_DMY[1],
      Day:
        parseInt(start_date_DMY[0]) < 10
          ? "0" + start_date_DMY[0]
          : start_date_DMY[0],
    },
    EndDate: {
      Year: "20" + end_date_DMY[2],
      Month:
        parseInt(end_date_DMY[1]) < 10
          ? "0" + end_date_DMY[1]
          : end_date_DMY[1],
      Day:
        parseInt(end_date_DMY[0]) < 10
          ? "0" + end_date_DMY[0]
          : end_date_DMY[0],
    },
  };
  return JSON.stringify(exper);
};

const perpareExperiences = async (all_res) => {
  let all_exper = [];
  for (const e of all_res) {
    // await UserTemplate.findOne({ id: e['תעודת זהות'] })
    await UserTemplate.findOne({ id: "313419483" })
      .exec()
      .then((user) => {
        if (user) {
          try {
            if (e["התנסות א"]) {
              run_exper = async () => {
                foo(user.UserName, e, "א").then((exper) => {
                  all_exper.push(JSON.parse(exper));
                });
              };
              run_exper();
            }
            if (e["התנסות ב"]) {
              run_exper = async () => {
                foo(user.UserName, e, "ב").then((exper) => {
                  all_exper.push(JSON.parse(exper));
                });
              };
              run_exper();
            }
            if (e["התנסות ג"]) {
              run_exper = async () => {
                foo(user.UserName, e, "ג").then((exper) => {
                  all_exper.push(JSON.parse(exper));
                });
              };
              run_exper();
            }
            if (e["התנסות ד"]) {
              run_exper = async () => {
                foo(user.UserName, e, "ד").then((exper) => {
                  all_exper.push(JSON.parse(exper));
                });
              };
              run_exper();
            }
            if (e["התנסות ה"]) {
              run_exper = async () => {
                foo(user.UserName, e, "ה").then((exper) => {
                  all_exper.push(JSON.parse(exper));
                });
              };
              run_exper();
            }
          } catch (err) {
            // No # experience
            console.log(err);
            return;
          }
        }
      });
  }

  return all_exper;
};

const activateAlgo = async (req, res) => {
  let url_script = process.env.apppath+"server/ScheduleAlgorithm/main.py";
  let url_cred = process.env.apppath+"server/ScheduleAlgorithm/scheduler-359321-2d5d4c4018a4.json";
  let all_res = {};

  const pythonProcess = spawn("python", [url_script, url_cred, "2>&1"]);
  pythonProcess.stdout.on("data", (data) => {
    all_res = JSON.parse(data);
    if (!Array.isArray(all_res)){
      res.status(400).send(false)
    }
  });

  pythonProcess.on("close", async (code) => {
    console.log(`child process exited with code ${code}`);
    // console.log(126, all_res)
    await perpareExperiences(all_res).then((all_exper_res) => {
      Experiences.insertMany(
        // all_exper_res,
        all_exper_res.slice(1, 5 + 1), // For test, just five
        function (error, docs) {}
      );
    }).then(()=>{
      res.status(200).json(true)
    });
  });
};

module.exports = {
  activateAlgo,
};
