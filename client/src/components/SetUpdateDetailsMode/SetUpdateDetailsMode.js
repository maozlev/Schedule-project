import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./SetUpdateDetailsMode.css"


export default function SetUpdateDetailsMode(props){
    const [status, setStatus] = useState(props.isAvaliable)

    useEffect(()=>{
        check()
    },[status])

    function check(){
        if(status){
            return "ניתן לעדכן פרטים"
        } else{
            return "אין אפשרות לעדכן פרטים"
        }
    }

    const submit =  async(val) => {
        await axios.post("http://localhost:3001/api/setIsAvaliableToUpdateDetails/", {
            value: val
        }).then (res => {
            setStatus(val)
          })
      };
    
    return(<div>
            <div className="current-status">
                <div >סטטוס נוכחי:</div>
                <div className="resultStatus">
                {check()}
                </div>
            </div>
            <div className="change-status-btn">
                <button onClick={() => submit(!status)}>שינוי עדכון פרטים</button>
            </div>

        </div>)

}