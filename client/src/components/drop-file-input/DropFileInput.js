import axios from 'axios';
 
import React,{Component} from 'react';
 
class App extends Component {
  
    state = {
      // Initially, no file is selected
      selectedFile: null,
      data: ""
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
      this.setState({ selectedFile: target.files[0] });
      this.fileToBase64(target.files[0],(err,result) => {
        if (result){
          this.setState({ data: result });
          console.log(result)
        }
      })
      console.log("file chosen") 
    };
    
    // On file upload (click the upload button)
    onFileUpload =  async(event) => {
      if(this.state.selectedFile != null) {
        let title = this.state.selectedFile.name + '_' + Date.now().toString()
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
        }
      };

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
                  <input type="file" onChange={this.onFileChange} />
                  <button onClick={this.onFileUpload}>שלח קבצים</button>
                </div>
              {this.fileData()}
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
 
  export default App;