import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import getYoutubeId from 'get-youtube-id'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

function Home() {
    const classes = useStyles();
    const [videoID, setVideoID] = useState("");
    let history = useHistory();

    function handleClick(e) {
        const id = getYoutubeId(videoID);
        console.log("Youtube vdeo ID found : ", id);

        history.push({
            pathname: '/video',
            search: `?videoID=${id}`,
            state: {
                videoID: id,
            },
        })


    }
    function handleNameChange(e) {
        window.$name = e.target.value;
    }
    function handleTextFieldChange(e) {
        setVideoID(e.target.value);
    }

    return (
        <div className="App">
            <Grid container>
                <Grid container item xs={12}>
                    {/* <AppBar position="fixed">
                        <Toolbar variant="dense">
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                YTPlus
                            </Typography>
                        </Toolbar>
                    </AppBar> */}
                </Grid>
                <Grid container item xs={12} spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="inherit">
                            Youtube Video Link
                    </Typography>
                    </Grid>


                    {/* <Grid item xs={12}>
                        <Typography variant="h6" color="inherit">
                            Your name
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <form noValidate autoComplete="off">
                            <TextField onChange={handleNameChange} id="standard-basic" label="Standard" />
                        </form>
                    </Grid> */}


                    <Grid item xs={12} >
                        <form noValidate autoComplete="off">
                            <TextField onChange={handleTextFieldChange} id="standard-basic" label="Enter youtube video link" />
                        </form>
                        <form noValidate autoComplete="off">
                            <TextField onChange={handleNameChange} id="standard-basic" label="Enter your name" />
                        </form>
                        <Button onClick={handleClick} variant="contained" color="secondary"> Submit </Button>
                    </Grid>


                </Grid>
            </Grid>


        </div>
    );
}

export default Home;
