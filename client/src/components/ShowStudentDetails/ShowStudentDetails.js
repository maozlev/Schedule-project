import React, { useState } from "react";
import axios from 'axios';
import "./ShowStudentDetails.css"


export default function ShowStudentDetails(props) {
    /*
    false - at the first entry or after send empty ID
    null - user doesn't exist in our DB
    user (object) - the document that recived from DB
    */
    let user = false


    /**
     * Check the status of user and present message "Not in our DB"
     * @returns 
     */
    function check() {
        if (user === false || user !== null) {
            return ""
        } else {
            return "סטודנט לא קיים במערכת"
        }
    }
    // experience hold all experience of user or null
    const [experience, setExperience] = useState(null)

    // student_id hold the student id or empty string
    const [student_id, setStudent_id] = useState("")

    
    /**
     * update student_id on change
     * @param {change of input field} event 
     */
    const handleChange = (event) => {
        setStudent_id(document.getElementById("id").value)
    }

    /**
     * Get the user from DB and set it on user (hook)
     * @returns 
     */
    async function collectUser(){
        if (student_id === "") {
            user = false;
            return {
                error: true,
                message: 'Please enter ID'
            };
        } else {
            await axios.get(`http://localhost:3001/api/getUserByID/${student_id}`)
                .then(async(res) => {
                    if (res.data === false) {
                        console.log("-- Not found any student with id: " + student_id)
                        user = null
                    } else {
                        console.log("-- User recived from DB\n" + JSON.stringify(res.data))
                        user = res.data
                    }
                })
        }
    }

    /**
     * Get all experiences of this student
     * @param {} student_username 
     */
    const searchExperienceByID = (student_username) => {
        axios.get(`http://localhost:3001/api/MyExperienceAdmin/${student_username}`) //Fetch the data from DB
            .then((response) => {setExperience(response.data)})
            .catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }

    /**
     * On click "submit" -> apply get username and get experience sequansly
     */
    // let data = {}
    async function submit(){
        await collectUser()
        if (user) {searchExperienceByID(user.UserName)}
    }

    function getYear(yearInNumber) {
        switch (yearInNumber){
                case "A":
                    return("א")
                case 1:
                    return("א")
                case "B":
                    return("ב")
                case 2:
                    return("ב")
                case "C":
                    return("ג")
                case 3:
                    return("ג")
                case "D":
                    return("ד")
                case 4:
                    return("ד")
                default:
                    return (<h4>שגיאה - נא לעדכן סטודנט זה</h4>);
            
        }
    }

    function createUserTable() {
        if (user !== null && user !== false) {
            return (
                <div>
                    <div className="user-details">
                    שם: {user.FirstName} {user.LastName} ,תעודת זהות: {user.id} <br /> עיר מגורים: {user.city} ,שנת לימודים: {getYear(user.year)}
                    </div>
                </div>
            )
        }
    }

    function deleteExperience(exper) {
        console.log(127, exper);
        // setExper(exper)
        // console.log(Exper)
        axios.get(`http://localhost:3001/api/deleteExperience/${student_id}`, {
            Hospital : exper.Hospital,
            Department : exper.Department,
            StartDay : {
                Year : exper.StartDate.Year,
                Month : exper.StartDate.Month,
                Day : exper.StartDate.Day
            },
            EndDate : {
                Year : exper.EndDate.Year,
                Month : exper.EndDate.Month,
                Day : exper.EndDate.Day
            }                   
        }).then(res => {
                    // TODO - print to log the response answer
                })
    }

    function createExperienceTable() {
        if (experience!== null){
            return(
                <div dir="rtl">
                    <button>הוסף התנסות</button>
                    <table>
                        <tr className="header-row">
                            <th>בית חולים / מוסד</th>
                            <th >מחלקה</th>
                            <th >התחלה</th>
                            <th >סוף</th>
                            <th ></th>
                        </tr>
                        {experience.map((exper) => (
                            <tr className="content-row">
                                <td>{exper.Hospital}</td>
                                <td>{exper.Department}</td>
                                <td>{exper.StartDate.Day}/{exper.StartDate.Month}/{exper.StartDate.Year}</td>
                                <td>{exper.EndDate.Day}/{exper.EndDate.Month}/{exper.EndDate.Year}</td>
                                <td><button onClick={ () => deleteExperience(exper)}>מחק התנסות</button> </td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        }

    return (<div>
        <div className="current-status">
            <div >הזן את תעודת הזהות של הסטודנט</div>
            <div className="resultStatus">
                {check()}
            </div>
        </div>
        <div className="change-status-btn">
            <input placeholder="ת.ז" onChange={handleChange} id="id"></input>
            <button onClick={() => submit()} style={{marginRight: "10px"}} >קבלת פרטי הסטודנט</button>
        </div>
        <div>
            {createUserTable()}
        </div>
        <hr style={{margin: "10px 10px 0px 10px"}}></hr>
        <div>
            {createExperienceTable()}
        </div>

    </div>)
    }