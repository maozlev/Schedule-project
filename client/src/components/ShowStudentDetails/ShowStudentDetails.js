import React, { useState } from "react";
import axios from "axios";
import "./ShowStudentDetails.css";
import { Hospitals, Experiences, Data } from "../../static/RequestFormData.js";
import { useEffect } from "react";

export default function ShowStudentDetails(props) {
  /*
    false - at the first entry or after send empty ID
    null - user doesn't exist in our DB
    user (object) - the document that recived from DB
    */
  let user = false;

  let newExp = {
    // _id: "",
    UserName: "",
    Group: "",
    Area: "",
    Department: "",
    Hospital: "",
    Address: { City: "", Street: "", Number: "" },
    Contact: "",
    PhoneNumber: "",
    Email: "",
    StartDate: { Year: "", Month: "", Day: "" },
    EndDate: { Year: "", Month: "", Day: "" },
  };

  /**
   * Check the status of user and present message "Not in our DB"
   * @returns
   */
  function check() {
    if (user === false || user !== null) {
      return "";
    } else {
      return "סטודנט לא קיים במערכת";
    }
  }
  // experience hold all experience of user or null
  const [experience, setExperience] = useState(null);

  // student_id hold the student id or empty string
  const [student_id, setStudent_id] = useState("");

  const [addExp, setAddExp] = useState(false);
  const [group, setGroup] = useState(null);
  const [area, setArea] = useState(null);
  const [department, setDepartment] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [contact, setContact] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [startDay, setStartDay] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [endMonth, setEndtMonth] = useState(null);
  const [endDay, setEndtDay] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);
  const [number, setNumber] = useState(null);

  /**
   * update student_id on change
   * @param {change of input field} event
   */
  const handleChange = (event) => {
    setStudent_id(document.getElementById("id").value);
  };

  /**
   * Get the user from DB and set it on user (hook)
   * @returns
   */
  async function collectUser() {
    if (student_id === "") {
      user = false;
      return {
        error: true,
        message: "Please enter ID",
      };
    } else {
      await axios
        .get(`http://localhost:3001/api/getUserByID/${student_id}`)
        .then(async (res) => {
          if (res.data === false) {
            console.log("-- Not found any student with id: " + student_id);
            user = null;
          } else {
            console.log("-- User recived from DB\n" + JSON.stringify(res.data));
            user = res.data;
          }
        });
    }
  }

  /**
   * Get all experiences of this student
   * @param {} student_username
   */
  const searchExperienceByID = (student_username) => {
    axios
      .get(`http://localhost:3001/api/MyExperienceAdmin/${student_username}`) //Fetch the data from DB
      .then((response) => {
        setExperience(response.data);
      })
      .catch((err) => {
        // Handle errors
        console.log("ERROR: " + JSON.stringify(err.response.data));
      });
  };

  /**
   * On click "submit" -> apply get username and get experience sequansly
   */
  // let data = {}
  async function submit() {
    await collectUser();
    if (user) {
      searchExperienceByID(user.UserName);
    }
  }

  function getYear(yearInNumber) {
    switch (yearInNumber) {
      case "A":
        return "א";
      case 1:
        return "א";
      case "B":
        return "ב";
      case 2:
        return "ב";
      case "C":
        return "ג";
      case 3:
        return "ג";
      case "D":
        return "ד";
      case 4:
        return "ד";
      default:
        return <h4>שגיאה - נא לעדכן סטודנט זה</h4>;
    }
  }

  useEffect(() => {
    setArea(null);
    setDepartment(null);
    createExperienceTable();
  }, [group]);

  useEffect(() => {
    if (!group) {
      setDepartment(null);
      createExperienceTable();
    }
  }, [area]);

  useEffect(() => {
    if (!group && !area) {
      setGroup(null);
      setArea(null);
      setHospital(null);
      createUserTable();
    }
  }, [department]);

  useEffect(() => {
    if (!group && !area && !department) {
      setGroup(null);
      setArea(null);
      setDepartment(null);
      createUserTable();
    }
  }, [hospital]);

  let groupsList = [];
  Data.forEach((g) => groupsList.push(g.GroupName));
  var groupListUnique = [...new Set(groupsList)];

  function addExperience() {
    let currHospiatl = Hospitals.filter(
      (hosp) => hosp.DisplayName === hospital
    )[0];
    // newExp._id = UUID.v4();
    newExp.UserName = student_id;
    newExp.Group = group;
    newExp.Area = currHospiatl?.Region;
    newExp.Department = department;
    newExp.Hospital = currHospiatl?.DisplayName;
    newExp.Contact = contact;
    newExp.PhoneNumber = phoneNumber;
    newExp.Email = email;
    newExp.Address = { City: city, Street: street, Number: number };
    newExp.StartDate = { Year: startYear, Month: startMonth, Day: startDay };
    newExp.EndDate = { Year: endYear, Month: endMonth, Day: endDay };

    axios.post(`http://localhost:3001/api/addExp/${student_id}`, {
      newExp,
    });
  }

  function createUserTable() {
    if (user !== null && user !== false) {
      return (
        <div>
          <div className="user-details">
            שם: {user.FirstName} {user.LastName} ,תעודת זהות: {user.id} <br />{" "}
            עיר מגורים: {user.city} ,שנת לימודים: {getYear(user.year)}
          </div>
        </div>
      );
    }
  }

  function deleteExperience(exper) {
    setExperience(experience.filter((exp) => exp._id != exper._id));
    axios
      .post(`http://localhost:3001/api/deleteExperience/${student_id}`, {
        _id: exper._id,
      })
      .then((res) => {
        console.log(res);
        // TODO - print to log the response answer
      });
  }
  useEffect(() => {
    if (experience !== null) {
      createExperienceTable();
    }
  }, [experience]);

  function createExperienceTable() {
    if (experience !== null) {
      return (
        <div dir="rtl">
          <button onClick={() => setAddExp(!addExp)}>הוסף התנסות</button>
          {addExp && (
            <div>
              <form className="addExp">
                <ul>
                  <div className="select">
                    <select
                      className="select group"
                      onChange={(e) => setGroup(e.target.value)}
                    >
                      <option value={null}>אנא בחר חטיבה</option>
                      {groupListUnique.map((g) => (
                        <option value={g}>{g}</option>
                      ))}
                    </select>
                    {group && (
                      <select
                        className="select area"
                        onChange={(e) => setArea(e.target.value)}
                      >
                        <option value={null}>אנא בחר תחום</option>
                        {Data.filter(
                          (g) => g?.GroupName === group
                        )[0]?.Area?.map((a) => (
                          <option value={a.AreaName}>{a.AreaName}</option>
                        ))}
                      </select>
                    )}
                    {group && area && (
                      <select
                        className="select department"
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option value={null}>אנא בחר מחלקה</option>
                        {Data.filter((g) => g?.GroupName === group)[0]
                          ?.Area.filter((a) => a.AreaName === area)[0]
                          ?.Departments?.map((d) => (
                            <option value={Experiences[d]}>
                              {Experiences[d]}
                            </option>
                          ))}
                      </select>
                    )}
                  </div>
                  <div className="select Hospital">
                    {group && area && department && (
                      <select
                        className="select hospital"
                        onChange={(e) => setHospital(e.target.value)}
                      >
                        <option value={null}>אנא בחר בית חולים</option>
                        {Hospitals.filter((h) =>
                          h?.Departments.includes(
                            Object.keys(Experiences).find(
                              (key) => Experiences[key] === department
                            )
                          )
                        ).map((hd) => (
                          <option value={hd.DisplayName}>
                            {hd.DisplayName}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="select date start">
                    <span className="span date">
                      {" "}
                      <input
                        id="city"
                        name="addressCity"
                        className="input addExpr address city"
                        placeholder="עיר"
                        onChange={(e) => setCity(e.target.value)}
                      ></input>
                    </span>
                    <span className="span date">
                      <input
                        id="street"
                        name="addressStreet"
                        className="input addExpr address street"
                        placeholder="רחוב"
                        onChange={(e) => setStreet(e.target.value)}
                      ></input>
                    </span>
                    <span className="span date">
                      <input
                        id="numberStreet"
                        name="numberStreet"
                        className="input numberStreet"
                        placeholder="מספר"
                        onChange={(e) => setNumber(e.target.value)}
                      ></input>
                    </span>
                  </div>
                  <div className="select date start">
                    <span className="span date">
                      <input
                        id="year"
                        name="Startyear"
                        className="input addExpr date year"
                        placeholder="שנה התחלה"
                        onChange={(e) => setStartYear(e.target.value)}
                      ></input>
                    </span>
                    <span className="span date">
                      <input
                        id="month"
                        name="Startmonth"
                        className="input addExpr date month"
                        placeholder="חודש התחלה"
                        onChange={(e) => setStartMonth(e.target.value)}
                      ></input>
                    </span>
                    <span className="span date">
                      <input
                        id="day"
                        name="Startday"
                        className="input addExpr date day"
                        placeholder="יום התחלה"
                        onChange={(e) => setStartDay(e.target.value)}
                      ></input>
                    </span>
                  </div>
                  <div className="select date end">
                    <span>
                      <input
                        id="year"
                        name="Endyear"
                        className="input addExpr date year"
                        placeholder="שנה סיום"
                        onChange={(e) => setEndYear(e.target.value)}
                      ></input>
                    </span>
                    <span>
                      <input
                        id=""
                        name="Endmonth"
                        className="input addExpr date month"
                        placeholder="חודש סיום"
                        onChange={(e) => setEndtMonth(e.target.value)}
                      ></input>
                    </span>
                    <span>
                      <input
                        id=""
                        name="Endday"
                        className="input addExpr date day"
                        placeholder="יום סיום"
                        onChange={(e) => setEndtDay(e.target.value)}
                      ></input>
                    </span>
                  </div>
                  <div className="select contactData">
                    <input
                      id="contact name"
                      name="Contact"
                      className="input contact name"
                      placeholder="איש קשר"
                      onChange={(e) => setContact(e.target.value)}
                    ></input>
                    <input
                      id="contact phone"
                      name="PhoneNumber"
                      className="input contact phone"
                      placeholder="טלפון"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    ></input>
                    <input
                      id="contact email"
                      name="Email"
                      className="input contact email"
                      placeholder="דואר אלקטרוני"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="btn submit addExpr">
                    <button type="button" onClick={() => addExperience()}>
                      שלח
                    </button>
                  </div>
                </ul>
              </form>
            </div>
          )}
          <table>
            <tr className="header-row">
              <th>בית חולים / מוסד</th>
              <th>מחלקה</th>
              <th>התחלה</th>
              <th>סוף</th>
              <th></th>
            </tr>
            {experience.map((exper) => (
              <tr className="content-row">
                <td>{exper.Hospital}</td>
                <td>{exper.Department}</td>
                <td>
                  {exper.StartDate.Day}/{exper.StartDate.Month}/
                  {exper.StartDate.Year}
                </td>
                <td>
                  {exper.EndDate.Day}/{exper.EndDate.Month}/{exper.EndDate.Year}
                </td>
                <td>
                  <button onClick={() => deleteExperience(exper)}>
                    מחק התנסות
                  </button>{" "}
                </td>
              </tr>
            ))}
          </table>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="current-status">
        <div>הזן את תעודת הזהות של הסטודנט</div>
        <div className="resultStatus">{check()}</div>
      </div>
      <div className="change-status-btn">
        <input placeholder="ת.ז" onChange={handleChange} id="id"></input>
        <button onClick={() => submit()} style={{ marginRight: "10px" }}>
          קבלת פרטי הסטודנט
        </button>
      </div>
      <div>{createUserTable()}</div>
      <hr style={{ margin: "10px 10px 0px 10px" }}></hr>
      <div>{createExperienceTable()}</div>
    </div>
  );
}
