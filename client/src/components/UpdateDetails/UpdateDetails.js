import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './UpdateDetails.css';
import Image from './Ariel.png';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { useNavigate} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  
}));

const theme = createTheme();

export default function Contant(props) {
  
  const[id, setid] = useState('');
  const[FirstName, setFirstName] = useState('');
  const[LastName, setLastName] = useState('');
  const[city, setcity] = useState('');
  const[year, setyear] = useState('');

  const submit = () => {
    axios.post("http://localhost:3001/api/insert", {
      id: id,
      FirstName: FirstName, 
      LastName: LastName, 
      city: city, 
      year: year
    }).then(() => {
      alert("נשלח בהצלחה");
    });
  };
  
  const classes = useStyles();

  const history = useNavigate();
  function home(){
    history('/'); 
  }
  return (
  <div className="App">
    <div id="update" className="form">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className="formbox"
          >
            <img  src={Image}/>
            <Box component="form"  sx={{ mt: 3 }} dir="rtl">
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <input type="int" name="id" placeholder='ת.ז' onChange={(e)=> {
                    setid(e.target.value)
                  }}/>
                </Grid>
                <Grid item xs={12} >
                  <input type="text" name="FirstName" placeholder='שם פרטי' onChange={(e)=> {
                  setFirstName(e.target.value)
                  }}/>
                </Grid>
                <Grid item xs={12} >
                  <input type="text" name="LastName" placeholder="שם משפחה" onChange={(e)=> {
                  setLastName(e.target.value)
                  }}/>
                </Grid>
                <Grid item xs={12}>
                  <input type="text" name="city" placeholder="עיר מגורים" onChange={(e)=> {
                  setcity(e.target.value)
                  }}/>
                </Grid>
                <Grid item xs={12}>
                  <input type="number" name="year" placeholder="שנת לימודים"onChange={(e)=> {
                  setyear(e.target.value)
                  }}/>
                </Grid>
              </Grid>
              <Button className='buttonsubmit' 
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }} onClick={submit}>
                שלח
              </Button>
              <Button className='buttonsubmit' 
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }} onClick={home}>
                חזור
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>

  </div>
  );
}