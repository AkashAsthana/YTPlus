import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Video from './components/Video'


function App() {
    return (
        <div className="App">
            <Grid item>
                <Grid item container xs={12}>
                    <Video
                    />
                </Grid>
                <Grid item container xs={12}>

                </Grid>

            </Grid>
        </div>
    );
}

export default App;
