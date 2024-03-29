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
// ────────────────────────────────────────────────────────────────────────────────


import Feedbacksurvey from './components/pages/unauthorized/Feedbacksurvey';
import Productadd from './components/pages/authorized/Product/views/ProductAdd';
import QcProcess from './components/pages/authorized/quality-control/views/QcProcess';
import Dashboard from './components/pages/authorized/Dashboard/views/Dashboard';
import Recruitment from './components/pages/authorized/Recruitment/views/RecruitmentGeneration';
import Registration from './components/pages/unauthorized/Recruitment/views/Registration';
import ProductDetail from './components/pages/authorized/Product/views/ProductDetail';
import ProductLayout from './components/pages/authorized/Product/adapter/ProductLayout/ProductLayout';
import QcQueue from './components/pages/authorized/quality-control/views/QcQueue';
import QcLayout from './components/pages/authorized/quality-control/adapter/QcLayout/QcLayout';
import Notification from './components/pages/authorized/Notification/views/NotificationList';
import PurchasementLayout from './components/pages/authorized/Purchasement/adapter/PurchasementLayout/PurchasementLayout';
import DeliberationLayout from './components/pages/authorized/Deliberation/adapter/DeliberationLayout/DeliberationLayout';

//
// ─── TOASTIFY ───────────────────────────────────────────────────────────────────
//
import { ToastContainer, toast } from 'react-toastify';
import MaintenanceCalibrationLayout from './components/pages/authorized/maintenance-calibration/adapter/MaintenanceCalibrationLayout/MaintenanceCalibrationLayout';
import NotificationPortal from './components/pages/authorized/Notification/views/NotificationPortal';
import RecruitmentLayout from './components/pages/authorized/Recruitment/adapter/RecruitmentLayout/RecruitmentLayout';
import PurchasementTracking from './components/pages/semirized/purchasement/views/purchasement-tracking';
import PrivateRoute from './components/common/PrivateRoute';
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
          <NotificationPortal/>
          <FullLoadingScreen/>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/login" exact component={Login}/>
            {/* <Route path="/sales" exact component={Sales}/> */}
            <Route path="/feedback/:id" exact component={Feedback}/>
            <Route path="/feedback-survey/:access_token" exact component={Feedbacksurvey}/>
            <PrivateRoute path="/recruitment" exact component={RecruitmentLayout}/>
            <Route path="/registration/:access_token" exact component={Registration}/>
            <PrivateRoute path="/dashboard" exact component={Dashboard}/>
            {/* <Route path="/qc-process" exact component={QcProcess}/>
            <Route path="/qc-queue" exact component={QcQueue}/> */}
            <PrivateRoute path="/quality-control" exact component={QcLayout}/>
            <PrivateRoute path="/purchasement" exact component={PurchasementLayout}/>
            {/* <Route path="/product-add" exact component={Productadd}/>          
            <Route path="/product-detail" exact component={ProductDetail}/> */}
            <PrivateRoute path="/product" exact component={ProductLayout}/>
            <PrivateRoute path="/deliberation" exact component={DeliberationLayout}/>
            <PrivateRoute path="/notifications" exact component={Notification}/>
            <Route path="/notifications/test" exact component={NotificationPortal}/>


            <PrivateRoute exact path="/maintenance" component={MaintenanceCalibrationLayout}/>

            <Route exact path="/purchasement-tracking/:confirmation_token" component={PurchasementTracking}/>
          </Switch>
          <ToastContainer />
          
      </Router>
  );
}

export default App;
