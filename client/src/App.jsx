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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/map" component={LocationSearchPage} />
        <Route exact path="/userprofile/:id" component={UserProfilePage} />
        <Route exact path="/petprofile/:id" component={PetProfilePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/account" component={AccountPage} />
      </Switch>
    </Router>
  );
};

export default App;
