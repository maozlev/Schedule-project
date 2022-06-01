import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./DownloadDocuments.css"

export default function DownloadDocuments(props){

    function searchStudentByID() {
        var student_id = document.getElementById("students_id").value;
        if(student_id == "") return;
        
        axios.get(`http://localhost:3001/api/getUserByID/${student_id}`) //Fetch the data from DB
            .then((response) => {
                student_username = response.data.username;
                return json({student : response.data , experience : searchExperienceByID(student_username)});
            }).catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }

    function searchExperienceByID(student_username){
        axios.get(`http://localhost:3001/api/MyExperienceAdmin/${student_username}`) //Fetch the data from DB
            .then((response) => {
                const experiences = response.data.exp;
                return experiences                        
            }).catch((err) => {
                // Handle errors
                console.log("ERROR: " + JSON.stringify(err.response.data))
            })
    }


    return(
        <div>
            <div className="collect-user-info">
                <label for="students_id">הכנס תעודת זהות סטודנט</label>
                <input type="text" id="students_id" name="students_id"/>
                <button onClick={()=>{searchStudentByID}}>חפש</button>
            </div>
        </div>
    )
}