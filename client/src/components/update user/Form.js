import React, {useState} from 'react'
import SingupForm from './SingupForm'
import SingupFormSuccess from './SingupFormSuccess'


const Form = (props) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);
    
    const submitForm = () => {
        setFormIsSubmitted(true);
    }
    if(props.isAvaliable){
  return (
    <div>
        { !formIsSubmitted ?( <SingupForm username={props.username} submitForm={submitForm}/>) : (<SingupFormSuccess/>)}
    </div>
  )}
  else{
    return(
    <div>
          <h1>לא ניתן לעדכן פרטים בשלב זה, אנא פנה למזכירות המחלקה</h1>  
    </div>
  )}
}

export default Form