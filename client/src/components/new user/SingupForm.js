import React, {useState, useEffect} from 'react';
import Validation from './Validation';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SingupForm = ( props, {submitForm}) => {
    let username = props.username;
    console.log(username);

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
    }
    const [values, setValues] = useState({
        username: username,
        id:"",
        FirstName:"",
        LastName:"",
        city:"",
        year:"",
    })
    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }
    const submit =  async() => {
        await axios.post("http://localhost:3001/api/update_details/", {
            UserName: username,
            id: values.id,
            FirstName: values.FirstName, 
            LastName: values.LastName, 
            city: values.city, 
            year: values.year
        }).then (res => {
            
            if (res.status === 200){
                alert("נשלח בהצלחה");
            }else{
                alert("אנא נסה שנית");
            }
            console.log(res);
            console.log(res.data);
          })
      };
    
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        setErrors(Validation(values))
        if(errors.id !== 'תעודת זהות תקינה'){
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
    }, [errors]);

    const history = useNavigate();
    function handleClickback(){
    history('/'); 
   }
  return (
    <div className='container'>
        <div className='app-wrapper'>
            <div>
                <h2 className='title'> create account </h2>
            </div>
            <form className='form-wrapper'>
                <div className='id'>
                    <label className='label'>id</label>
                    <input className='input'
                        type='int'
                        name='id'
                        value={values.id}
                        onChange={handleChange}>
                    </input>
                    {errors.id && <p className='error'>{errors.id}</p>}
                </div>
                <div className='FirstName'>
                    <label className='label'>FirstName</label>
                    <input className='input'
                        type='text'
                        name='FirstName' 
                        value={values.FirstName} 
                        onChange={handleChange}>
                    </input>
                    {errors.FirstName && <p className='error'>{errors.FirstName}</p>}
                </div> 
                <div className='LastName'>
                    <label className='label'>LastName</label>
                    <input className='input' 
                        type='text' 
                        name='LastName' 
                        value={values.LastName} 
                        onChange={handleChange}>
                    </input>
                    {errors.LastName && <p className='error'>{errors.LastName}</p>}
                </div> 
                <div className='city'>
                    <label className='label'>city</label>
                    <input className='input' 
                        type='text' 
                        name='city' 
                        value={values.city} 
                        onChange={handleChange}>
                    </input>
                    {errors.city && <p className='error'>{errors.city}</p>}
                </div> 
                <div className='year'>
                    <InputLabel id="select_year">תוכן הקובץ</InputLabel>
                        <Select
                            labelId="select_year"
                            id="select_year"
                            value={values.year}
                            label="Age">
                            <MenuItem value={1}>שנה א'</MenuItem>
                            <MenuItem value={2}>שנה ב'</MenuItem>
                            <MenuItem value={3}>שנה ג'</MenuItem>
                            <MenuItem value={4}>שנה ד</MenuItem>
                        </Select>
                    {errors.year && <p className='error'>{errors.year}</p>}
                </div>
                <button className='submit' onClick={handleFormSubmit}>הירשם</button>
            </form>
            <Link to="/">
                <button>
                    חזור לעמוד הבית    
                </button>
            </Link>
        </div>
    </div>
  )
}

export default SingupForm