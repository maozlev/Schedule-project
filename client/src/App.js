import './App.css';
import * as React from 'react';
import { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import ThingsToDo from './components/ThingsToDo/ThingsToDo';
import Landing from './components/Landing/Landing';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UpdateDetails from './components/UpdateDetails/UpdateDetails';
import AppBarU from './components/AppBarU/AppBarU';

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
          <Route path='' element={<div className={classes.root}>
            <CssBaseline/>  
            <Landing username={user.username} onClick={signOut}/>
            <ThingsToDo/>
            <button onClick={signOut}>Sign out</button>
            </div>}
          />
          <Route exact path='/ex' element={<div>ההתנסויות שלי</div>}/>
          <Route exact path='/papers' element={<div>הגשת טפסים</div>}/>
          <Route exact path='/update' 
          element={
          <div>
            <UpdateDetails username={user.username}/>
          </div>}/>
          <Route exact path='*' element={<div>404 Not Found!</div>}/>
        </Routes>
      </Router>
    </>
  );
}
export default withAuthenticator(App);
