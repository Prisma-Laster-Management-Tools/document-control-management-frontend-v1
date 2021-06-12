import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import Dashboard from './components/pages/authorized/Dashboard';
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
import Dashboard from './components/pages/authorized/Dashboard/views';
import Recruitment from './components/pages/authorized/Recruitment/views/RecruitmentGeneration';
import Registration from './components/pages/unauthorized/Recruitment/views/Registration';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── TOASTIFY ───────────────────────────────────────────────────────────────────
//
import { ToastContainer, toast } from 'react-toastify';
import ProductDetail from './components/pages/authorized/Product/views/ProductDetail';
import ProductLayout from './components/pages/authorized/Product/adapter/ProductLayout/ProductLayout';
import QcQueue from './components/pages/authorized/quality-control/views/QcQueue';
import QcLayout from './components/pages/authorized/quality-control/adapter/QcLayout/QcLayout';
import Notification from './components/pages/authorized/Notification/views';
import Createsource from './components/pages/authorized/Purchase/views/CreateSource';
import Partdetail from './components/pages/authorized/Purchase/views/PartDetail/views';
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
            <Route path="/feedback/:id" exact component={Feedback}/>
            <Route path="/feedback-survey/:access_token" exact component={Feedbacksurvey}/>
            <Route path="/recruitment" exact component={Recruitment}/>
            <Route path="/registration/:access_token" exact component={Registration}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/qc-process" exact component={QcProcess}/>
            <Route path="/qc-queue" exact component={QcQueue}/>
            <Route path="/quality-control" exact component={QcLayout}/>
            <Route path="/product-add" exact component={Productadd}/>
            <Route path="/pr-order" exact component={Prorder}/>            
            <Route path="/product-detail" exact component={ProductDetail}/>
            <Route path="/product" exact component={ProductLayout}/>

            <Route path="/notifications" exact component={Notification}/>
            <Route path="/create-source-detail" exact component={Createsource}/>
            <Route path="/part-detail" exact component={Partdetail}/>
          </Switch>
          <ToastContainer />
          
      </Router>
  );
}

export default App;
