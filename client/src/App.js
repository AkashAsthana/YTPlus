import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home'
import Video from './components/Video'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <header className="App-header">
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        {/* <Typography variant="h6" color="inherit">
                            YTPlus
                            </Typography> */}
                        <Typography variant="h6" color="inherit">
                            YTPlus,          Made with love by Akash, Abhay and Aaradhya
                            </Typography>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/video" exact component={Video} />
                </Switch>

            </header>
        </div>
    );
}

export default App;
