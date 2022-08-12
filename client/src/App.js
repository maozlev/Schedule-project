import './App.css';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import ThingsToDo from './components/ThingsToDo/ThingsToDo';
import Landing from './components/Landing/Landing';
import {Amplify, AWSPluginsCore, Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/update user/Form'
import FormNew from './components/new user/Form'
import FileUpload from './components/drop-file-input/DropFileInput'
import MyExper from './components/My-experiences/MyExperiences'
import RequestForm from './components/RequestForm/RequestForm'
import ReactLoading from "react-loading";

import axios from "axios"
import Popup from 'reactjs-popup';
// import Modal from './components/Modal/Modal'
import Admin from "./components/Admin/Admin"

Amplify.configure(awsconfig);


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '10vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/background.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));


function App({ signOut, user }) {
  const classes = useStyles();
  // Variable to check if user already set his details
  const [isinDB, setisinDB] = useState(null);
  const [avaliableToUpdate, setIsAvaliableToUpdate] = useState(null);
  const [flag,setFlag] = useState(false)
  /*
  This function search in our DB if user already exist.
  */
  async function userIsInDB() {
    axios.get(`http://localhost:3001/api/checkisExist/${user.username}`)
        .then (async (response) => {
          console.log("-- Checked if this username insert his details to our DB.\nAnswer: " + response.data)
          setisinDB(response.data);
          setFlag(true)
        }).catch((err) => {
            // Handle errors
            console.log("ERROR: " + JSON.stringify(err.response.data))
        })
  }

  // Check if students can update there details
  async function getConfiguration() {
    axios.get("http://localhost:3001/api/getConfiguration")
        .then (async (response) => {
          console.log("-- Collect configuration from DB")
          setIsAvaliableToUpdate(response.data.value);
        }).catch((err) => {
            // Handle errors
            console.log("ERROR: " + JSON.stringify(err.response.data))
        })
  }
  //TODO - accept just admin user!
  let IsAdmin = user.username == "ADMIN" ? true : false;

  useEffect(async ()=>{
    await userIsInDB();
    await getConfiguration();
  },[])
  
  //Flag to wait for answer from UserIsInDB function
  if(!flag){
    return null
  }else{
    return (
      <>
        <Router>  
          {!isinDB &&<Routes>
            <Route exact path='*' // Catch all pathes to any page
            element={
            <div>
              <FormNew username={user.username}/>
            </div>}/>
          </Routes>}
          {isinDB &&<Routes>
            <Route path='' element={
              <div className={classes.root}>
                  <script>
                  let creds = await Auth.currentUserCredentials()
                  console.log(creds.identityId)
                  </script>
                <CssBaseline/>  
                <Landing username={user.username} onSignout={signOut} isAdmin = {IsAdmin}/>
                <ThingsToDo/>  
              </div>}
            />
            <Route exact path='/experience' element={
              <div>
              <MyExper username={user.username}/>
              </div>}/>
              <Route exact path='/RequestedForm' element={
                <div>
                  <RequestForm username={user.username}/>
                </div>}/>
            <Route exact path='/papers' element={
              <div>
                <FileUpload username={user.username}/>
              </div>}/>
            <Route exact path='/update' 
            element={
            <div>
              <Form username={user.username} isAvaliable={avaliableToUpdate}/>
            </div>}/>
            {/*TODO design 404 page*/}
            <Route exact path='/admin' 
            element={
            <div>
              <Admin username={user.username} isAvaliable={avaliableToUpdate}/>
            </div>}/>
            <Route exact path='*' element={<div>404 Not Found!</div>}/>
          </Routes>}
        </Router>
      </>
    );}
}
export default withAuthenticator(App);
