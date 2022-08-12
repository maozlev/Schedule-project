import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Collapse } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassNames } from '@emotion/react';
import Stack from '@mui/material/Stack';
import {useNavigate} from 'react-router-dom';
import './ImageCard.css'


const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      background: 'rgba(0,0,0,0)',
      margin: '30px',
    },
    media: {
      height: 250,
    },
    title: {
      fontFamily: 'Nunito',
      fontWeight: 'bold',
      fontSize: '2rem',
      color: '#fff',
    },
    desc: {
      fontFamily: 'Nunito',
      fontSize: '1.1rem',
      color: '#ddd',
    },
  });

export default function ImageCard({thing, checked}) {
    const classes = useStyles();
    const history = useNavigate();
    function handleClick(){
     history('/experience'); 
    }
  return (
      <Collapse in={checked} {... (checked ? {timeout: 1000} : {})}>
        <Card className={classes.root}>
            <CardMedia 
                className={classes.media}
                image={thing.imageUrl}
                title="calender"
            />
            <CardContent>
                <Typography 
                className={ClassNames.title} 
                gutterBottom 
                variant="h2" 
                component="h3"
                >
                {thing.title}
                </Typography>
                <Typography 
                variant="body2"
                color="text.secondary"
                component="p"
                className={classes.desc}
                >
                {thing.description}
                </Typography>
            </CardContent>
            <Stack spacing={2} direction="row">
              <div className='buttonMainPage'>
                <Button variant="contained" onClick={handleClick} type="Button">
                  לחץ כאן 
                </Button>
              </div>
              
            </Stack>
        </Card>
    </Collapse>
  );
}
