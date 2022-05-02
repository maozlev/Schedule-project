import './App.css';
import * as React from 'react';
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
import FileUpload from './components/drop-file-input/DropFileInput'
import MyExper from './components/My-experiences/MyExperiences'

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
          <Route exact path='*' element={<div>404 Not Found!</div>}/>
        </Routes>
      </Router>
    </>
  );
}
export default withAuthenticator(App);
