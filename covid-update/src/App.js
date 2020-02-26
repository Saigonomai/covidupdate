import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
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
