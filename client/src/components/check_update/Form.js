import React, {useState} from 'react'
import SingupForm from './SingupForm'
import SingupFormSuccess from './SingupFormSuccess'

const Form = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    const submitForm = () => {
        setFormIsSubmitted(true);
    }
  return (
    <div>
        { !formIsSubmitted ?( <SingupForm submitForm={submitForm}/>) : (<SingupFormSuccess/>)}
    </div>
  )
}

export default Form