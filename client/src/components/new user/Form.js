import React, {useState} from 'react'
import SingupForm from './SingupForm'

const Form = (props) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const submitForm = () => {
        setFormIsSubmitted(true);
    }
  return (
    <div>
       <SingupForm username={props.username} submitForm={submitForm}/>
    </div>
  )
}

export default Form