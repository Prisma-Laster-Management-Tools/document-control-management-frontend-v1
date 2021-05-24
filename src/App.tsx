import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import ClassWithRecoil from './components/pages/playground/ClassWithRecoil';
import LandingPage from './components/pages/unauthorized/LandingPage';
import { CreateClassWithEmbeddedState } from './core/recoil/transformation/class-with-embedded-state';

function App() {
  return (
    <RecoilRoot>
      <Router>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
          </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
