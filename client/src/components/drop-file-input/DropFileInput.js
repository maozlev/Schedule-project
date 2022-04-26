import axios from 'axios';
 
import React,{Component} from 'react';
 
class App extends Component {
  
    state = {
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
      console.log("file chosen")
      // Update the state
      this.setState({ 
        selectedFile: event.target.files[0] 
      });
      console.log(event.target.files[0]);
    
    };
    
    // On file upload (click the upload button)
    onFileUpload =  async() => {
    
      // Create an object of formData
      // const formData = new FormData();
    
      // // Update the formData object
      // formData.append("myFile", this.state.selectedFile)
      // formData.append("FileName", this.state.selectedFile.name)
      // formData.append("UserName", this.props.username)


    
      // // Details of the uploaded file
      // console.log(this.state.selectedFile);
      // console.log(formData)
    
      // Request made to the backend api
      // Send formData object
      // axios.post("http://localhost:3001/api/papers", formData);
      const fd = new FormData()
      fd.append('file', this.state.selectedFile, this.state.selectedFile.name)
        await axios.post("http://localhost:3001/api/papers/", {
            UserName: this.props.username,
            FormData: fd
            
        }).then (res => {
            console.log(res)
            if (res.status === 200){
                alert("נשלח בהצלחה");
            }
            else{
                alert("אנא נסה שנית");
            }
            // console.log(res);
            console.log(res.data);
          })
      };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {
      if (this.state.selectedFile) {
        return (
          <div>
            <h2>File Details:</h2>
              <p>username: {this.props.username}</p>
             
              <p>File Name: {this.state.selectedFile.name}</p>
 
              <p>File Type: {this.state.selectedFile.type}</p>

              <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (

        <div className='container'>
          <div className='app-wrapper'>
              <div>
                  <h2 className='title'> Upload youre files </h2>
              </div>
              <form className='form-wrapper'>
              <div>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
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