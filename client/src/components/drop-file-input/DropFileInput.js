import axios from 'axios';
 
import React,{Component, useState} from 'react';
// Import the main component
import{Viewer, Worker}from'@react-pdf-viewer/core';     
// Import the styles
import'@react-pdf-viewer/core/lib/styles/index.css'; 

class App extends Component {
  
    state = {
      // Initially, no file is selected
      selectedFile: null,
      data: "",
      type: ""
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
              Title: title,
              FileAsData: this.state.data,
          })
          .then (res => {
              console.log(res)
              if (res.status === 200){
                  alert("נשלח בהצלחה");
              }else{
                  alert("אנא נסה שנית");
              }
              console.log(res.data);
            })
          }else{
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
            <h2>פרטי הקובץ:</h2>
            <p>שם המשתמש: {this.props.username}</p>
            <p>שם הקובץ: {this.state.selectedFile.name}</p>
            <p>סוג הקובץ: {this.state.selectedFile.type}</p>
            <p>תאריך שינוי אחרון:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString() }</p>
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>אנא בחר קובץ לפני ההעלאה</h4>
          </div>
        ); 
      }
    };
    
    render() {
      return (
        <div className='container' dir="rtl">
          <div className='app-wrapper'>
              <div>
                  <h2 className='title'> העלאת קבצים </h2>
              </div>
              <form className='form-wrapper'>
              <div>
                <div>
                  <input type="file" onChange={this.onFileChange} accept='application/pdf' />
                  <button className='btn-btn-submit' onClick={this.onFileUpload}>שלח קבצים</button>
                </div>
                {this.fileData()}
              </div>
              <div>
                {this.PreviewPDF()}
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
 
  export default App;