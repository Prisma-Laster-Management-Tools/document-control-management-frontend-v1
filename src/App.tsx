import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import Feedback from './components/pages/authorized/Deliberation/views/Feedback';
import Sales from './components/pages/authorized/Deliberation/views/Sales';
import Login from './components/pages/unauthorized/Authentication/views/Login';
// import ClassWithRecoil from './components/pages/playground/ClassWithRecoil';
import LandingPage from './components/pages/unauthorized/LandingPage';
import { CreateClassWithEmbeddedState } from './core/recoil/transformation/class-with-embedded-state';

function App() {
  return (
    <RecoilRoot>
      <Router>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/sales" exact component={Sales}/>
            <Route path="/feedback" exact component={Feedback}/>
          </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
