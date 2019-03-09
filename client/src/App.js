import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./containers/Search";
import Saved from "./containers/Saved";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path ="/" component={Search} />
          <Route exact path ="/saved" component={Saved} />
          <Route render={() => <h1 className="text-center m-5">404, Page not Found</h1>} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
