import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScheduleAlgorithm.css";
import Button from '@mui/material/Button';

export default function ScheduleAlgorithm(props) {
    const [file, setFile] = useState(null)

    // On file select (from the pop up)
    async function onFileChange({target}){
        if(target.files < 1 || !target.validity.valid){
          return
        }
        this.setState({ selectedFile: target.files[0], type: target.files[0].type });
        fileToBase64(target.files[0],(err,result) => {
          if (result){
            this.setState({ data: result });
          }
        })
        console.log("file chosen")
      };

    async function fileToBase64(file,cb){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = function() {
          cb(null,fileReader.result)
        }
        fileReader.onerror = function (error) {
          cb(error,null)
        }
      };

    return (
        <div>
            <Button variant="contained" component="label">
                בחר קובץ
                <input type="file" hidden accept='application/pdf' onChange={() => onFileChange} />
            </Button>
        </div>
    );
}