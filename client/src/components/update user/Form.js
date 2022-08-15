import React, { useState } from "react";
import SingupForm from "./SingupForm";
import SingupFormSuccess from "./SingupFormSuccess";
import axios from "axios";

async function checkIfCanUpdate(setUpdate){
  await axios.get("http://localhost:3001/api/checkIfCanUpdate/").then((res) => {
    setUpdate(res.data)
  });
};

const Form = (props) => {
  const [update,setUpdate] = useState(false)
  checkIfCanUpdate(setUpdate)
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const submitForm = () => {
    setFormIsSubmitted(true);
  };
  if (update) {
    return (
      <div>
        {!formIsSubmitted ? (
          <SingupForm username={props.username} submitForm={submitForm} />
        ) : (
          <SingupFormSuccess />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>לא ניתן לעדכן פרטים בשלב זה, אנא פנה למזכירות המחלקה</h1>
      </div>
    );
  }
};

export default Form;
