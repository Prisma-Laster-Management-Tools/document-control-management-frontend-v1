import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Feedback from './components/pages/authorized/Deliberation/views/Feedback';
import Sales from './components/pages/authorized/Deliberation/views/Sales';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import FullLoadingScreen from './components/common/full-loading-screen';
import Login from './components/pages/unauthorized/Authentication/views/Login';
// import ClassWithRecoil from './components/pages/playground/ClassWithRecoil';
import LandingPage from './components/pages/unauthorized/LandingPage';
import { Authentication } from './core/authentication/Authentication';
import { LoadingScreen } from './core/loading-screen/LoadingScreen';
import { CreateClassWithEmbeddedState } from './core/recoil/transformation/class-with-embedded-state';
import { authenticationState } from './store/recoil/authentication/authentication.atom';
import { loadingScreenState } from './store/recoil/loading-screen/loading-screen.atom';

//
// ─── MOMENT ─────────────────────────────────────────────────────────────────────
//
import 'moment/locale/th';
import 'moment-timezone';
import Feedbacksurvey from './components/pages/unauthorized/Feedbacksurvey';
import Productadd from './components/pages/authorized/Product/views/ProductAdd';
import Prorder from './components/pages/authorized/Purchase/views/PrOrder';
import QcProcess from './components/pages/authorized/quality-control/views/QcProcess';
// ────────────────────────────────────────────────────────────────────────────────

function App() {
  //
  // ─── STORING RECOIL REF ─────────────────────────────────────────────────────────
  //
  const [authState,setAuthState] = useRecoilState(authenticationState)
  const setLoadingScreenState = useSetRecoilState(loadingScreenState)
  React.useEffect(() => {
    Authentication.instanciate_recoil(authState,setAuthState)
  }, [authState])
  React.useEffect(() => {
    Authentication.load_stored_token_in_the_local_storage()

    // Instantiate recoil [SETTER ONLY]
    LoadingScreen.instanciate_recoil(setLoadingScreenState)
    // ─────────────────────────────────────────────────────────────────

  },[])
  // ────────────────────────────────────────────────────────────────────────────────


  return (
      <Router>
          <FullLoadingScreen/>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/sales" exact component={Sales}/>
            <Route path="/feedback" exact component={Feedback}/>
            <Route path="/feedback-survey" exact component={Feedbacksurvey}/>

            <Route path="/qc-process" exact component={QcProcess}/>
            <Route path="/product-add" exact component={Productadd}/>
            <Route path="/pr-order" exact component={Prorder}/>
          </Switch>
      </Router>
  );
}

export default App;
