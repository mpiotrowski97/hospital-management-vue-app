import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Operations from "./pages/Operations";
import './assets/css/main.css';
import Header from "./Header";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <div className="App container">
      <Router>
        <Header/>

        <div className="container w-full mx-auto pt-20">
          <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
            <Switch>
              <Route path={"/"} exact>
                <Operations/>
              </Route>
              <Route path={"/my-account"}>
                <MyAccount/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
