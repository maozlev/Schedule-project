import React, {useState, useEffect} from 'react';
import Validation from './Validation';
import axios from 'axios';

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
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }
    const submit =  async() => {
        const response = await axios.post("http://localhost:3001/api/insert", {
          username: username,
          id: values.id,
          FirstName: values.FirstName, 
          LastName: values.LastName, 
          city: values.city, 
          year: values.year
        }) .then(res => {
            if (res.data === 'OK'){
                alert("נשלח בהצלחה");
                alert(username);
            }
            else{
                alert("אנא נסה שנית");
                alert(username);
            }
            console.log(res);
            console.log(res.data);
          })
      };
    
    const handleFormSubmit = async (event)=>{
        event.preventDefault();
        setErrors(Validation(values))
        if(errors.id != 1){
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
                    <label className='label'>year</label>
                    <input className='input' 
                        type='number' 
                        name='year' 
                        value={values.year} 
                        onChange={handleChange}>
                    </input>
                    {errors.year && <p className='error'>{errors.year}</p>}
                </div>
                <button className='submit' onClick={handleFormSubmit}>הירשם</button>
            </form>
        </div>
    </div>
  )
}

export default SingupForm