import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import firebase from "firebase"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import firebaseConfig from "./config"

// import page
import Home from "./home/home"
import Project from "./project/project"
import Dashboard from "./dashboard/dashboard"

import AllTracks from "./static/static"

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


class App extends Component {
  render() {
    return (<Router>
      <Switch>

        <Route exact path="/project/:id" render={(props) => {
          return (
            <>
              <Project id={props.match.params.id} />
            </>)
        }} />


        {/* homepage specific page */}
        <Route exact path="/dashboard/:id" render={(props) => {
          return (
            <>
              <Dashboard id={props.match.params.id} />
            </>)
        }} />


        {/* // home page  */}
        <Route path="/dashboard">
          <Dashboard id={null} />
        </Route>


        {/* // photo page  */}
        <Route path="/photographie">
          <Home />
        </Route>



        {/* // home page  */}
        <Route path="/">
          <Static />
        </Route>


      </Switch>
    </Router>
    );
  }
}

export default App;
