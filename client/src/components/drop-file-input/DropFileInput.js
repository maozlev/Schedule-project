import axios from 'axios';
 
import React,{Component, useState} from 'react';
// Import the main component
import{Viewer, Worker}from'@react-pdf-viewer/core';
// Import the styles
import'@react-pdf-viewer/core/lib/styles/index.css'; 

// import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate} from 'react-router-dom';     
import Button from '@mui/material/Button';
import "./DropFileInput.css"


class App extends Component {
  
    state = {
      // Initially, no file is selected
      selectedFile: null,
      data: "",
      type: "",
      subject: ""
    };
    
    fileToBase64 = async(file,cb) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = function() {
        cb(null,fileReader.result)
      }
      fileReader.onerror = function (error) {
        cb(error,null)
      }
    };

    // On file select (from the pop up)
    onFileChange = async({target}) => {
      if(target.files < 1 || !target.validity.valid){
        return
      }
      this.setState({ selectedFile: target.files[0], type: target.files[0].type });
      this.fileToBase64(target.files[0],(err,result) => {
        if (result){
          this.setState({ data: result });
        }
      })
      console.log("file chosen")
    };
    
    // On file upload (click the upload button)
    onFileUpload =  async(event) => {
      if(this.state.selectedFile != null) {
        let title = this.state.selectedFile.name + '_' + Date.now().toString()
        if(this.state.type === 'application/pdf'){
          await axios.post("http://localhost:3001/api/papers/", {
              UserName: this.props.username,
              Subject: this.state.subject,
              Title: title,
              FileAsData: this.state.data
              
          })
          .then (res => {
              console.log(res)
              if (res.status === 200){
                  alert("???????? ????????????");
              }else{
                  alert("?????? ?????? ????????");
              }
              console.log(res.data);
            })
          }else{
            //TODO need disable this alert and return to select another file
            alert("Please choose PDF file!")
            return;
          }
        }
      };

      // https://react-pdf-viewer.dev/examples/preview-a-pdf-file-from-base-64/

      base64toBlob = (data) => {
        // Cut the prefix from the raw base 64
        const base64 = data.split("base64,")
        console.log(base64[1])
        const bytes = atob(base64[1]);
        let length = bytes.length;
        let out = new Uint8Array(length);
    
        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }
        return new Blob([out], { type: 'application/pdf' });
      };
      
      
      PreviewPDF(){
        if(this.state.data){
            const blob = this.base64toBlob(this.state.data);
            const url = URL.createObjectURL(blob);
            return (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                <div
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '750px',
                  }}>
                  <Viewer fileUrl={url} />
                </div>
              </Worker>);
        }
      }


    // File content to be displayed after
    // file upload is complete
    fileData = () => {
      if (this.state.selectedFile) {
        return (
          <div>
            <br/>
            <br/>
            <h2>???????? ??????????:</h2>
            <p>???? ????????????: {this.props.username}</p>
            <p>???? ??????????: {this.state.selectedFile.name}</p>
            <p>?????? ??????????: {this.state.selectedFile.type}</p>
            <p>?????????? ?????????? ??????????:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString() }</p>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>?????? ?????? ???????? ???????? ????????????</h4>
          </div>
        ); 
      }
    };
    
    handleSubject = async(event) => {
      this.setState({subject : event.target.value.toString()});
    }
    
    render() {
      return (
        <div className='container' dir="rtl">
          <div className='app-wrapper'>
              <div>
                  <h2 className='title'> ?????????? ???????????? ???????????? </h2>
              </div>
              <form className='form-wrapper'>
              <div>
                <div>
                <Button className = "btn-select-file" variant="contained" component="label"> 
                  ?????? ????????
                  <input type="file" hidden accept='application/pdf' onChange={this.onFileChange}/>
                </Button>
                  <Box sx={{ minWidth: 120, marginTop: '25px' }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">???????? ??????????</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.subject}
                        label="Age"
                        onChange={this.handleSubject} >
                        <MenuItem value={"Internal"}>?????????? ???????????? ??????????</MenuItem>
                        <MenuItem value={"Surgical"}>?????????? ???????????? ??????????????</MenuItem>
                        <MenuItem value={"Intensive-care"}>?????????? ???????????? ???????????? ??????????????</MenuItem>
                        <MenuItem value={"Gynecologiy"}>?????????? ??????????</MenuItem>
                        <MenuItem value={"Community"}>?????????? ????????????</MenuItem>
                        <MenuItem value={"Pediatric"}>?????????? ????????</MenuItem>
                        <MenuItem value={"Psychiatry"}>?????????? ???????????? ????????</MenuItem>
                        <MenuItem value={"Special"}>???????????? ???????????? ??????????????</MenuItem>
                        <MenuItem value={"Advance"}>???????????? ???????????? ????????????</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>
                  <Button variant="contained" style={{marginTop : '25px'}} className='btn-btn-submit' onClick={this.onFileUpload}>?????? ??????????</Button>
                </div>
                {this.fileData()}
              </div>
              <div>
                {this.PreviewPDF()}
              </div>
              <div className='buttons'>
                    <Link to="/">
                        <Button variant="outlined" className='btn-return-hompage' style={{ float: 'left' }}>
                            ???????? ?????????? ????????    
                        </Button>
                    </Link>
                </div>
            </form>
          </div>
        </div>
      );
    }
  }
 
  export default App;