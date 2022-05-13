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
import Form from './components/check_update/Form'
import FormNew from './components/new user/Form'
import FileUpload from './components/drop-file-input/DropFileInput'
import MyExper from './components/My-experiences/MyExperiences'
import axios from "axios"
import Popup from 'reactjs-popup';
import Modal from './components/Modal/Modal'
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

  const [isinDB, setisinDB] = useState(null);
  useEffect(() => {
    userIsInDB();
    }, []);
  function userIsInDB() {
    axios.get(`http://localhost:3001/api/checkisExist/${user.username}`)
        .then((response) => {
          console.log("DATA IS : " + response.data)
          setisinDB(response.data);
        }).catch((err) => {
            // Handle errors
            console.log("ERROR: " + JSON.stringify(err.response.data))
        })
  }
  
  console.log("ans is: =" + isinDB)
  if(!isinDB){}
  
  
  return (
    
    <>
      <Router>  
        <Routes>
          <Route path='' element={
            <div className={classes.root}>
                <script>
                let creds = await Auth.currentUserCredentials()
                console.log(creds.identityId)
                </script>
              <CssBaseline/>  
              <Landing username={user.username} onClick={signOut}/>
              <Modal username={user.username}></Modal>
              <ThingsToDo/>
              
              <button onClick={signOut}>Sign out</button>
            </div>}
          />
          <Route exact path='/experience' element={
            <div>
            <MyExper username={user.username}/>
            </div>}
                                            />
          <Route exact path='/papers' element={
            <div>
              <FileUpload username={user.username}/>
            </div>}
                                              />
          <Route exact path='/update' 
          element={
          <div>
            {/* <UpdateDetails username={user.username}/> */}
            <Form username={user.username}/>
          </div>}/>
          <Route exact path='/new_user' 
          element={
          <div>
            {/* <UpdateDetails username={user.username}/> */}
            <FormNew username={user.username}/>
          </div>}/>
          <Route exact path='*' element={<div>404 Not Found!</div>}/>
        </Routes>
      </Router>
    </>
  );
}
export default withAuthenticator(App);
