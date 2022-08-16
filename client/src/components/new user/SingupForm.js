import React, { useState, useEffect } from "react";
import {useNavigate, Link} from 'react-router-dom';
import axios from "axios";
import "./SingupForm.css";
import Button from "@mui/material/Button";

const { citiesOptions } = require("../../static/Cities.js");

const SingupForm = (props, { submitForm }) => {
  const history = useNavigate();
  let username = props.username;
  console.log("hello", username);

  const [values, setValues] = useState({
    username: username,
    id: "",
    FirstName: "",
    LastName: "",
    city: "",
    year: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const submit = async () => {
    await axios
      .post("http://localhost:3001/api/createUser/", {
        UserName: username,
        id: values.id,
        FirstName: values.FirstName,
        LastName: values.LastName,
        city: values.city,
        year: values.year,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("נשלח בהצלחה");
          setIsSubmitted(true);
          history("/");
        } else {
          alert("אנא נסה שנית");
        }
      });
  };

  // useEffect(() => {}, [isSubmitted]);

  return (
    <div className="container">
      {!isSubmitted && (
        <div className="app-wrapper">
          <div>
            <h2 className="to_middle"> צור משתמש </h2>
          </div>
          <form className="form-wrapper" dir="rtl">
            <div className="id">
              <label className="label">תעודת זהות</label>
              <input
                className="input"
                type="int"
                name="id"
                value={values.id}
                onChange={handleChange}
              ></input>
            </div>
            <div className="FirstName">
              <label className="label">שם פרטי</label>
              <input
                className="input"
                type="text"
                name="FirstName"
                value={values.FirstName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="LastName">
              <label className="label">שם משפחה</label>
              <input
                className="input"
                type="text"
                name="LastName"
                value={values.LastName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="city">
              <label className="label">עיר מגורים</label>
              <br />
              <select name="city" id="city" onChange={handleChange}>
                <option selected disabled>
                  בחר עיר
                </option>
                {citiesOptions.map((city) => (
                  <option value={city.text}>{city.value}</option>
                ))}
              </select>
            </div>
            <div className="year">
              <label className="label">שנת לימודים</label>
              <br />
              <select name="year" id="year" onChange={handleChange}>
                <option selected disabled>
                  בחר שנה
                </option>

                <option value={1}>שנה א'</option>
                <option value={2}>שנה ב'</option>
                <option value={3}>שנה ג'</option>
                <option value={4}>שנה ד'</option>
              </select>
            </div>
            <div className="buttons">
              <Button
                variant="contained"
                className="btn-submit"
                onClick={submit}
                style={{ float: "right" }}
              >
                הירשם
              </Button>
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
      )}
      {isSubmitted && (
        <div className="app-wrapper">
          <form className="form-wrapper" dir="rtl">
            <div className="buttons buttonssubmitt">
              <Link to="/">
                <Button
                  variant="outlined"
                  className="btn-return-hompage"
                  style={{ float: "left" }}
                >
                  רענן לעמוד הבית
                </Button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingupForm;
