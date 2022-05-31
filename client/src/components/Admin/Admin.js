import "./Admin.css"
import axios from 'axios';

import {useState, useEffect} from 'react'
import { margin } from "@mui/system";


function Admin(props) {
    let valueOfIsAvaliable = props.isAvaliable
    
    const submit =  async(val) => {
        await axios.post("http://localhost:3001/api/setIsAvaliableToUpdateDetails/", {
            value: val
        }).then (res => {
            valueOfIsAvaliable = val
          })
      };

    return(
        <div dir="rtl">
            <div>
                <h3>דף מנהל</h3>
            </div>
            <div>
                <button onClick={() => submit(true)}>שינוי עדכון פרטים</button>
            </div>
        </div>
        
    )
}

export default Admin;