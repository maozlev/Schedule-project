import React, { Component } from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react';

export default function FileUpload(props) {

  const[file, setfile] = useState('');

  const handler = (event) => {
    console.log(event.target.files[0]);
  };

  const submit = () => {
    axios.post("http://localhost:3001/api/uploadDocs", {
     username: props.username,
     file: file,
    }).then(() => {
      alert("נשלח בהצלחה");
    });
  };

  const fileUploadHandler = (event) => {
    console.log("user "+props.username+" uploaded file")
    axios.post("http://localhost:3001/api/uploadDocs")
  };

  return (
  <div className="App">
    <div id="update" className="form">
     <input type="file" name="file"onChange={(e)=> {
        setfile(e.target.value)}}
    />
    <button onClick={fileUploadHandler}>
      שלח
    </button>
     
    </div>

  </div>
  );
}