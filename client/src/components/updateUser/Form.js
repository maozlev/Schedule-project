import React, { useState } from "react";
import SingupForm from "./SingupForm";


const Form = (props) => {
  console.log(6, props.avaliableToUpdate);
  if (props.avaliableToUpdate) {
    return (
      <div>
        <SingupForm username={props.username}/>
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
