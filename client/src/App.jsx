import React from 'react';
import Nav from './Navbar/Nav';
import Landing from './Landing Page/Landing';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Login/RegisterPage';
import AccountPage from './Account/AccountPage';
import LocationSearchPage from './SearchMap/LocationSearchPage';
import SearchPage from './SearchMap/SearchPage';
import UserProfilePage from './Profiles/UserProfile/UserProfilePage';
import PetProfilePage from './Profiles/PetProfile/PetProfilePage';
import SecureRoute from './Routes/SecureRoute';
import ForgotPasswordPage from './Login/ForgotPasswordPage';
import LoggedInRoute from './Routes/LoggedInRoute';
import UpdatePassword from './Login/UpdatePassword';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/map" component={LocationSearchPage} />
          <Route exact path="/userprofile/:id" component={UserProfilePage} />
          <Route exact path="/petprofile/:id" component={PetProfilePage} />
          <Route exact path="/password" component={ForgotPasswordPage} />
          <Route exact path="/update-password" component={UpdatePassword} />
          <LoggedInRoute exact path="/login" component={LoginPage} />
          <LoggedInRoute exact path="/register" component={RegisterPage} />
          <SecureRoute exact path="/account" component={AccountPage} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
};

export default App;
