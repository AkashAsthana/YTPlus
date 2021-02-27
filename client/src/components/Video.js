import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import YouTube from './YouTube'


function App() {
    return (
        <div className="App">
            <Grid item>
                <Grid item container xs={12}>
                    <YouTube />
                </Grid>
                <Grid item container xs={12}>

                </Grid>

            </Grid>
        </div>
    );
}

export default App;
