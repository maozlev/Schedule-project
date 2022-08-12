import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {  CssBaseline } from "@material-ui/core";
import Header from '../Header/Header';
import './Landing.css';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		backgroundAttachment: "fixed",
    },

}));

export default function Landing(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Header username={props.username} isAdmin={props.isAdmin} onSignout = {props.onSignout}/>
        </div>
    );
}
