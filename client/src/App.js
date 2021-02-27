import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home'
import Video from './components/Video'


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>YouTube Enhancer</h1>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/video" exact component={Video} />
                </Switch>

            </header>
        </div>
    );
}

export default App;
