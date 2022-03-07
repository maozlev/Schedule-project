import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import Menu from '../Menu/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Nunito',
    },
    appbar: {
      background: 'none',
    },
    appbarWrapper: {
      width: '80%',
      margin: '0 auto',
      display: 'flex',
      position: 'fix  ',
    },
    appbarTitle: {
      flexGrow: '1',
    },
    icon: {
      color: '#fff',
      fontSize: '5rem',
    },
    colorText: {
      color: '#0169d2',
    },
    container: {
      textAlign: 'center',
    },
    title: {
      color: '#0169d2',
      fontSize: '4.5rem',
    },
    
  }));
export default function AppBarU( props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
      setChecked(true);
    }, []);
    return (
      <div className={classes.root} id="header">  
        <AppBar className={classes.appbar} elevation={0}>
          <Toolbar className={classes.appbarWrapper}>
            <h1 
              className={classes.appbarTitle}>
              My<span className={classes.colorText}>scheduler.</span>
            </h1>
            <h1 
              className={classes.appbarTitle}>
              hello<span className={classes.colorText}> {props.username}!</span>
            </h1>
            <IconButton position='fix'>
              <Menu/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  