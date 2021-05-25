import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RecoilRoot, useRecoilState } from 'recoil';
import Login from './components/pages/unauthorized/Authentication/views/Login';
// import ClassWithRecoil from './components/pages/playground/ClassWithRecoil';
import LandingPage from './components/pages/unauthorized/LandingPage';
import { Authentication } from './core/authentication/Authentication';
import { CreateClassWithEmbeddedState } from './core/recoil/transformation/class-with-embedded-state';
import { authenticationState } from './store/recoil/authentication/authentication.atom';

function App() {
  //
  // ─── STORING RECOIL REF ─────────────────────────────────────────────────────────
  //
  const [authState,setAuthState] = useRecoilState(authenticationState)
  React.useEffect(() => {
    Authentication.instanciate_recoil(authState,setAuthState)
  }, [authState])
  // ────────────────────────────────────────────────────────────────────────────────


  return (
      <Router>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/login" exact component={Login}/>
          </Switch>
      </Router>
  );
}

export default App;
