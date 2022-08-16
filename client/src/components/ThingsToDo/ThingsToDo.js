import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from '../ImageCard/ImageCard';
import ImageCardRequestForm from '../ImageCard-RequestForm/ImageCard-RequestForm';
import ImageCardMyDocs from '../ImageCard-MyDocs/ImageCard-MyDocs'
import ImageCardCopy from '../ImageCard copy/ImageCardCopy';
import things from '../../static/Things';
import useWindowPosition from '../../hook/useWindowPosition';

const useStyles = makeStyles((theme) => ({
    root : {
        minHeight: '100vh',
        direction: 'rtl',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
}));
export default function ThingsToDo() {
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return (
    <div className={classes.root} id="thing-to-do">
        <ImageCard thing={things[0]} checked={checked}/>
        <ImageCardCopy thing={things[1]} checked={checked}/>
        {/* <ImageCardRequestForm thing={things[2]} checked={checked}/> */}
        <ImageCardMyDocs thing={things[3]} checked={checked}/>

    </div>
    );
}
