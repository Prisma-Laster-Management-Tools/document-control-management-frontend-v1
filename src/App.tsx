import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/pages/unauthorized/LandingPage';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={LandingPage}/>
        </Switch>
    </Router>
  );
}

export default App;
