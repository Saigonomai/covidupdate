import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css"
import Main from "./pages/Main";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
            <Route exact path="/" component={Main} />
            {/* <Route/> */}
            {/* <Route/> */}
        </Switch>
      </div>
    </Router>
    );
}

export default App;
