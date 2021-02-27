import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Home from './components/Home'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/core/MenuIcon'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'



function Home() {
    const [data, setData] = useState({});
    const [link, setLink] = useState("");
    let history = useHistory();

    function handleClick(e) {
        setData({
            link: link
        });

        history.push({
            pathname: '/video',
            search: `?link=${link}`,  // query string
            state: {  // location state
                link: link,
            },
        })


    }

    function handleTextFieldChange(e) {
        setLink(e.target.value);
    }

    return (
        <div className="App">
            <Grid container>
                <Grid container item xs={12}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                Photos
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid container item xs={12}>
                    <Typography variant="h6" color="inherit">
                        Youtube Video Link
                    </Typography>
                    <form noValidate autoComplete="off">
                        <TextField onChange={handleTextFieldChange} id="standard-basic" label="Standard" />
                    </form>
                    <Button onClick={handleClick}> Submit </Button>
                </Grid>
            </Grid>


        </div>
    );
}

export default Home;
