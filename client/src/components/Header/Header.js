import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Toolbar, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import AppBarU from '../AppBarU/AppBarU';
import { color } from '@mui/system';
import "./Header.css"


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
    goDown: {
      color: '#0169d2',
      fontSize: '4rem',
    },
  }));
export default function Header( props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
      setChecked(true);
    }, []);
    
    return (
      <div className={classes.root} id="header">  
        <AppBarU username={props.username}/>
        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedHeight={50}
        >
          <div 
            className={classes.container}>
            <h1 className={classes.title}>
              Welcome {props.username} to <br />
              the<span className={classes.colorText}> scheduler.</span>
            </h1>
            <Scroll to="thing-to-do" smooth={true}>
              <IconButton>
                <ExpandMoreIcon className={classes.goDown} />
              </IconButton>
            </Scroll>
          </div>
        </Collapse>
      </div>
    );
  }
  