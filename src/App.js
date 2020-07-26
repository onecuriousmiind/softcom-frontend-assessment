import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { GetStarted, Dashboard } from './pages'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact><Redirect to="/get-started" /></Route>
          <Route path="/dashboard" exact><Dashboard /></Route>
          <Route path="/get-started" exact><GetStarted /></Route>
        </Switch>
      </Router>
    </div>
  );
}
