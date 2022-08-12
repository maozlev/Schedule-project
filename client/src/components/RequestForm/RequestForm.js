import axios from "axios";
import "./RequestForm.css"
import {useForm} from 'react-hook-form'
import {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom';     
import {Hospitals, Regions, Experiences} from "../../static/RequestFormData.js"
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';



function RequestsForm({username}) {
    const [region1,setRegion1] = useState(null)
    const [region2,setRegion2] = useState(null)
    const [status, setStatus] = useState(false)
    const history = useNavigate();


    // useEffect(()=>{

    // })

    const [values, setValues] = useState({
        UserName: username,
        H1DInternal:null,
        H1DSurgical:null,
        H1DIntensiveCare:null,
        H1DGynecologiy:null,
        H1DCommunity:null,
        H1DPediatric:null,
        H1DPsychiatry:null,
        H1DSpecial:null,
        H1DAdvance:null,

        H2DInternal:null,
        H2_Surgical:null,
        H2DIntensiveCare:null,
        H2DGynecologiy:null,
        H2DCommunity:null,
        H2DPediatric:null,
        H2DPsychiatry:null,
        H2DSpecial:null,
        H2DAdvance:null
    })

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    const submitRequestForm =  async() => {
        if(values.region1 = null){
            console.log("Must select the first region!");
        }
        var Final = []
        Object.keys(values).forEach(e => {
            if(e.startsWith("H1") && values[e] != null && region1){
                Final.push({
                    Region:region1.toString(),
                    Hospital:values[e].toString(),
                    Eperience: e.toString().substring(2)
                })
            }
            if(e.startsWith("H2") && values[e] != null && region2){
                Final.push({
                    Region:region1.toString(),
                    Hospital:values[e].toString(),
                    Eperience: e.toString().substring(2)
                })
            }
        })
        await axios.post("http://localhost:3001/api/SubmitExperienceRequests/", {
            UserName: username,
            Requests: Final
        }).then (res => {
            if (res.status === 200){
                alert("הטופס נשמר בהצלחה!")
            }
          })
      };

    return (
        <div className="RequestsForm background-image">
            <div className="Title">
                <div>
                    <h1>בקשות שיבוץ</h1>
                </div>
            </div>
            <div className="FormContainer" dir="rtl">
                <form>
                    <div id="Region1-container">
                        <h2>אזור 1</h2>
                        <div >
                            <InputLabel id="region1">אנא בחר אזור</InputLabel>
                            <Select labelId="region1"
                                    id="region1"
                                    name="region1" 
                                    onChange={(e) => setRegion1(e.target.value)}>
                                {Regions.map(r => 
                                    <MenuItem value={r}>{r}</MenuItem>)}
                            </Select>
                        </div>
                        <br/>
                        {region1 && Object.keys(Experiences).map((exper,idx) =>
                            // {(Hospitals.filter(hosp => hosp.Region == region1 && hosp.Departments.includes(exper)).length > 0) &&
                             <div className={"Region1-Departments "+exper}>
                                <InputLabel id={"H1D"+ exper}>{Experiences[exper]}</InputLabel>
                                <Select 
                                labelId={"H1D"+ exper}
                                name={"H1D"+ exper} 
                                id={"H1D"+ exper} 
                                autoWidth
                                onChange={handleChange}>
                                    {Hospitals.filter(hosp => hosp.Region == region1 && hosp.Departments.includes(exper)).map(h => 
                                        <MenuItem value={h.DisplayName}>{h.DisplayName}</MenuItem>
                                    )}
                                </Select>
                            </div>
                        )} 
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <div id="Region2-container">
                    <h2>אזור 2</h2>

                        <div>
                            <InputLabel id="region2">אנא בחר אזור</InputLabel>
                            <Select name="region2" 
                                    id="region2" 
                                    onChange={(e) => setRegion2(e.target.value)}>
                                <MenuItem value={null} selected="selected">אנא בחר אזור</MenuItem>
                                {Regions.map(r => 
                                    <MenuItem value={r}>{r}</MenuItem>)}
                            </Select>
                        </div>
                        <br/>
                        {region2 && Object.keys(Experiences).map((exper,idx) =>
                            <div className={"Region2-Departments "+exper}>
                                <InputLabel id={"H2D"+ exper}>{Experiences[exper]}</InputLabel>
                                <Select 
                                labelId={"H2D"+ exper}
                                name={"H2D"+ exper} 
                                id={"H2D"+ exper} 
                                onChange={handleChange}>
                                    {Hospitals.filter(hosp => hosp.Region == region2 && hosp.Departments.includes(exper)).map(h => 
                                        <MenuItem value={h.DisplayName}>{h.DisplayName}</MenuItem>
                                    )}
                                </Select>
                            </div>  
                        )} 
                    </div>
                    <Button type="button" variant="contained" onClick={submitRequestForm}>שלח</Button>
                </form>
            </div>
        </div>
    );
}

export default RequestsForm;
