import React, {useState, useEffect} from 'react';
import Validation from './Validation';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SingupForm.css'
import Button from '@mui/material/Button';

const {citiesOptions} = require("../../static/Cities.js")



const SingupForm = ( props, {submitForm}) => {
    let username = props.username;
    console.log(username);


    const [values, setValues] = useState({
        username: username,
        id:"",
        FirstName:"",
        LastName:"",
        city:"",
        year:"",
    })
    const [errors, setErrors] = useState({});
    
    async function errorSet(values){
        setErrors(Validation(values))
    }
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }
    const submit =  async() => {
        await axios.post("http://localhost:3001/api/setUserDetails/", {
            UserName: username,
            id: values.id,
            FirstName: values.FirstName, 
            LastName: values.LastName, 
            city: values.city, 
            year: values.year
        }).then (res => {
            
            if (res.status === 200){
                alert("נשלח בהצלחה");
            }
            else{
                alert("אנא נסה שנית");
            }
            console.log(res);
            console.log(res.data);
          })
      };
    
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        await errorSet(values)
        if(typeof errors.length !== 'undefined'){
            console.log("there are errors");
            console.log(errors)
            alert("אנא נסה שנית");
            return;
        }
        setDataIsCorrect(true)
        submit();
    }
    useEffect(() => {
        if(Object.keys(errors).length === 0 && dataIsCorrect){
            submitForm(true);
        }
        var cities = document.getElementById('city')
        for(var i = 0; i < citiesOptions.length; i++){
            var option = citiesOptions[i];
            cities.options.add( new Option(option.text, option.value) );
          }
    }, [errors]);

   
  return (
    <div className='container' >
        <div className='app-wrapper' >
            <div>
                <h2 className='to_middle'> צור משתמש </h2>
            </div>
            <form className='form-wrapper' dir="rtl">
                <div className='id'>
                    <label className='label'>תעודת זהות</label>
                    <input className='input'
                        type='int'
                        name='id'
                        value={values.id}
                        onChange={handleChange}>
                    </input>
                    {errors.id && <p className='error'>{errors.id}</p>}
                </div>
                <div className='FirstName' >
                    <label className='label' >שם פרטי</label>
                    <input className='input' 
                        type='text'
                        name='FirstName' 
                        value={values.FirstName} 
                        onChange={handleChange}
                        >
                    </input>
                    {errors.FirstName && <p className='error'>{errors.FirstName}</p>}
                </div> 
                <div className='LastName'>
                    <label className='label'>שם משפחה</label>
                    <input className='input' 
                        type='text' 
                        name='LastName' 
                        value={values.LastName} 
                        onChange={handleChange}>
                    </input>
                    {errors.LastName && <p className='error'>{errors.LastName}</p>}
                </div> 
                <div className='city'>
                    <label className='label'>עיר מגורים</label>
                    <br/>
                    <select name="city" id="city" onChange={handleChange}/>
                    {//List of cities are update from Static/cities.js on useEffect()
                    }
                    {errors.city && <p className='error'>{errors.city}</p>}
                </div> 
                <div className='year'>
                    <label className='label'>שנת לימודים</label>
                    <br/>
                    <select name="year" id="year" onChange={handleChange}>
                        <option value="A">שנה א'</option>
                        <option value="B">שנה ב'</option>
                        <option value="C">שנה ג'</option>
                        <option value="D">שנה ד'</option>
                    </select>
                    {errors.year && <p className='error'>{errors.year}</p>}
                </div>
                <div className='buttons'>
                    <Button  variant="contained" className='btn-submit' onClick={handleFormSubmit} style={{ float: 'right' }}>הירשם</Button>
                    <Link to="/">
                        <Button variant="outlined" className='btn-return-hompage' style={{ float: 'left' }}>
                            חזור לעמוד הבית    
                        </Button>
                    </Link>
                </div>
            </form>
                
            
        </div>
    </div>
  )
}

export default SingupForm