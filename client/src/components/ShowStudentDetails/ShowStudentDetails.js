import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./ShowStudentDetails.css"


export default function ShowStudentDetails(props){
    /*
    Status handle user state-
    false - in the first entry or after send empty ID
    null - user doesn't exist in our DB
    user (object) - the document that recived from DB
    */
    const [user, setUser] = useState(false)
    useEffect(()=>{
        check()
    },[user])    

    /**
     * Check the status of user and present message "Not in our DB"
     * @returns 
     */
    function check(){
        if(user === false || user !== null){
            return ""
        } else{
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
    const collectUser = async ()=>{
        if(student_id === "") {
            setUser(false)
            return {
                error: true,
                message: 'Please enter ID'
            };
        } else {
        await axios.get(`http://localhost:3001/api/getUserByID/${student_id}`)
            .then (res => {
            if(res.data == false){
                console.log("-- Not found any student with id: " + student_id)
                setUser(null)
            }else{
                console.log("-- User recived from DB\n" + JSON.stringify(res.data))
                setUser(res.data)
                }
            })
        }
    }

    /**
     * Get all experiences of this student
     * @param {} student_username 
     */
    async function searchExperienceByID(student_username){
        await axios.get(`http://localhost:3001/api/MyExperienceAdmin/${student_username}`) //Fetch the data from DB
            .then((response) => {
                console.log("-- found experiences for this user - " + student_username )
                setExperience(response.data)
            }).catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }

    /**
     * On click "submit" -> apply get username and get experience sequansly
     */
    const submit =  async() => {
        await collectUser()
        .then(()=>{
            if(user !== null){
                searchExperienceByID(user.UserName)
                .then(()=>{
                    console.log("user from hook = " + JSON.stringify(user))
                    console.log("experience from hook = " + JSON.stringify(experience))
                })
            }   
        })
    } 
    
    return(<div>
            <div className="current-status">
                <div >הזן את תעודת הזהות של הסטודנט</div>
                <div className="resultStatus">
                {check()}
                </div>
            </div>
            <div className="change-status-btn">
                <input placeholder="ת.ז" onChange={handleChange} id="id"></input>
                <button onClick={() => submit()}>קבלת פרטי הסטודנט</button>
            </div>

        </div>)
}