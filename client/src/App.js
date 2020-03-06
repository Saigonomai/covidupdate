import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css"
import Main from "./pages/Main";
import News from "./pages/News";
import Maps from "./pages/Maps";
import { Nav } from "./components/Nav";

class App extends Component {
    constructor(props){
        super(props);
        this.translate = this.translate.bind(this)
        this.state = {
            language: "cn"
        }
    }

    translate = () => {
        if (this.state.language == "en") {
            this.setState({language:"cn"});
        } else if (this.state.language == "cn") {
            this.setState({language:"en"});
        } else {
            this.setState({language:"en"});
        }
    }

    render(){
        return (
        <Router>
            <div className="App">
            <Nav
            language={this.state.language}
            translate={this.translate}
            />
            <Switch>
                <Route
                exact path="/"
                render={(props) => <Main {...props} language={this.state.language}/>}
                />
                <Route
                exact path="/news"
                render={(props) => <News {...props} language={this.state.language}/>}                />
                <Route
                exact path="/maps"
                render={(props) => <Maps {...props} language={this.state.language}/>}                />
            </Switch>
            </div>
        </Router>
        );
    }
}

export default App;
