import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Operations from "./views/Operations";
import './assets/css/main.css';
import Header from "./Header";

function App() {
  return (
    <div className="App container">
      <Router>
        <Header/>

        <Switch>
          <Route path={"/"} exact>
            <Operations/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
