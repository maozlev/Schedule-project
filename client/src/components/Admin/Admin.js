import "./Admin.css"
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from "react";
import SetUpdateDetailsMode from "../SetUpdateDetailsMode/SetUpdateDetailsMode.js"
import ShowStudentDetails from "../ShowStudentDetails/ShowStudentDetails";
import ScheduleAlgorithm from "../ScheduleAlgorithm/ScheduleAlgorithm"
import DownloadDocuments from "../DownloadDocuments/DownloadDocuments"
import { Link } from 'react-router-dom';

function Admin(props) {
    const [mainOption, setMainOption] = useState(null);
    const handleChange = (event) => {
        setMainOption(event.target.value);
    };

    function fetchChoice() {
        switch (mainOption) {
            case "changeUpdateDetails":
                // return (<h1>changeUpdateDetails</h1>);

                return (<SetUpdateDetailsMode isAvaliable={props.isAvaliable} />);
            case "changeStudentExperience":
                return (<ShowStudentDetails username={props.username}/>);
            case "downloadDocuments":
                return (<DownloadDocuments/>);
            case "scheduleAlgorithm":
                return(<ScheduleAlgorithm/>);
            case "reports":
                return (<h1>reports</h1>);
            default:
                return (<h4>יש לבחור אפשרות מהרשימה</h4>);
        }
    }

    // let valueOfIsAvaliable = props.isAvaliable

    // const submit = async (val) => {
    //     await axios.post("http://localhost:3001/api/setIsAvaliableToUpdateDetails/", {
    //         value: val
    //     }).then(res => {
    //         valueOfIsAvaliable = val
    //     })
    // };

    return (
        <div dir="rtl">
            <div>
                <Link to="/">
                    <button variant="outlined" className='btn-return-hompage' style={{ float: 'left' }}>
                        חזור לעמוד הבית
                    </button>
                </Link>
            </div>
            <div>
                <h3>דף מנהל</h3>
                <p style={{ marginRight: "50px", fontSize: 30 }}>יש לבחור פעולה מהרשימה</p>
            </div>

            <div className="select-main-option">
                <Box sx={{ minWidth: 120, marginRight: 20, marginLeft: 80 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-main-option-label">בחר פעולה</InputLabel>
                        <Select
                            labelId="select-main-option"
                            id="select-main-option"
                            value={mainOption}
                            label="בחר פעולה"
                            onChange={handleChange}
                        >
                            <MenuItem value={"changeUpdateDetails"}>שינוי הגדרת עדכון פרטים</MenuItem>
                            <MenuItem value={"changeStudentExperience"}>שינוי שיבוץ לסטודנט</MenuItem>
                            <MenuItem value={"downloadDocuments"}>הורדת אישורי התנסויות</MenuItem>
                            <MenuItem value={"reports"}>דוחות</MenuItem>
                            <MenuItem value={"scheduleAlgorithm"}>הרצת אלגוריתם שיבוץ</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <hr style={{ margin: "50px 30px 0px 30px" }}></hr>
            <div className="choices">
                {fetchChoice()}
            </div>
        </div>)
}

export default Admin;