import React, {useState} from 'react'
import SingupForm from './SingupForm'
import SingupFormSuccess from './SingupFormSuccess'

const Form = (props) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const submitForm = () => {
        setFormIsSubmitted(true);
    }
  return (
    <div>
        { !formIsSubmitted ?( <SingupForm username={props.username} submitForm={submitForm}/>) : (<SingupFormSuccess/>)}
    </div>
  )
}

export default Form