import axios from "axios";

import React, { Component } from "react";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./DropFileInput.css";

class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    data: "",
    type: "",
    subject: "",
  };

  fileToBase64 = async (file, cb) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      cb(null, fileReader.result);
    };
    fileReader.onerror = function (error) {
      cb(error, null);
    };
  };

  // On file select (from the pop up)
  onFileChange = async ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    this.setState({
      selectedFile: target.files[0],
      type: target.files[0].type,
    });
    this.fileToBase64(target.files[0], (err, result) => {
      if (result) {
        this.setState({ data: result });
      }
    });
  };

  // On file upload (click the upload button)
  onFileUpload = async (event) => {
    if (this.state.selectedFile != null) {
      let title = this.state.selectedFile.name;
      if (this.state.type === "application/pdf") {
        await axios
          .post("http://localhost:3001/api/papers/", {
            UserName: this.props.username,
            Subject: this.state.subject,
            Title: title,
            FileAsData: this.state.data,
          })
          .then((res) => {
            if (res.status === 200) {
              alert("נשלח בהצלחה");
              return;
            } else {
              alert("אנא נסה שנית");
            }
          });
      } else {
        //TODO need disable this alert and return to select another file
        alert("Please choose PDF file!");
        return;
      }
    }
  };

  // https://react-pdf-viewer.dev/examples/preview-a-pdf-file-from-base-64/

  base64toBlob = (data) => {
    // Cut the prefix from the raw base 64
    const base64 = data.split("base64,");
    const bytes = atob(base64[1]);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: "application/pdf" });
  };

  PreviewPDF() {
    if (this.state.data) {
      const blob = this.base64toBlob(this.state.data);
      const url = URL.createObjectURL(blob);
      return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "750px",
            }}
          >
            <Viewer fileUrl={url} />
          </div>
        </Worker>
      );
    }
  }

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <br />
          <br />
          <h2>פרטי הקובץ:</h2>
          <p>שם המשתמש: {this.props.username}</p>
          <p>שם הקובץ: {this.state.selectedFile.name}</p>
          <p>סוג הקובץ: {this.state.selectedFile.type}</p>
          <p>
            תאריך שינוי אחרון:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
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

  handleSubject = async (event) => {
    this.setState({ subject: event.target.value.toString() });
  };

  render() {
    return (
      <div className="container" dir="rtl">
        <div className="app-wrapper">
          <div>
            <h2 className="title"> העלאת אישורי התנסות </h2>
          </div>
          <form className="form-wrapper">
            <div>
              <div>
                <Button
                  className="btn-select-file"
                  variant="contained"
                  component="label"
                >
                  בחר קובץ
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={this.onFileChange}
                  />
                </Button>
                <Box sx={{ minWidth: 120, marginTop: "25px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      תוכן הקובץ
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.subject}
                      label="Age"
                      onChange={this.handleSubject}
                    >
                      <MenuItem value={"Internal"}>סיעוד המבוגר פנימי</MenuItem>
                      <MenuItem value={"Surgical"}>
                        סיעוד המבוגר כירורגי
                      </MenuItem>
                      <MenuItem value={"Intensive-care"}>
                        סיעוד במצבים דחופים וטראומה
                      </MenuItem>
                      <MenuItem value={"Gynecologiy"}>סיעוד האישה</MenuItem>
                      <MenuItem value={"Community"}>סיעוד בקהילה</MenuItem>
                      <MenuItem value={"Pediatric"}>סיעוד הילד</MenuItem>
                      <MenuItem value={"Psychiatry"}>
                        סיעוד בריאות הנפש
                      </MenuItem>
                      <MenuItem value={"Special"}>
                        התנסות קלינית ייחודית
                      </MenuItem>
                      <MenuItem value={"Advance"}>
                        התנסות קלינית מתקדמת
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  style={{ marginTop: "25px" }}
                  className="btn-btn-submit"
                  onClick={this.onFileUpload}
                >
                  שלח קבצים
                </Button>
              </div>
              {this.fileData()}
            </div>
            <div>{this.PreviewPDF()}</div>
            <div className="buttons">
              <Link to="/">
                <Button
                  variant="outlined"
                  className="btn-return-hompage"
                  style={{ float: "left" }}
                >
                  חזור לעמוד הבית
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
