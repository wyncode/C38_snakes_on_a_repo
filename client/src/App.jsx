import React from 'react';
import Nav from './Navbar/Nav';
import Landing from './Landing Page/Landing';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Login/RegisterPage';
import OwnerProfilePage from './Profiles/OwnerProfile/OwnerProfilePage';
import SitterProfilePage from './Profiles/SitterProfile/SitterProfilePage';
import PetProfilePage from './Profiles/PetProfile/PetProfilePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        {/* <Route exact path="/search" component={SearchMapPage} /> */}
        <Route exact path="/ownerprofile" component={OwnerProfilePage} />
        <Route exact path="/sitterprofile" component={SitterProfilePage} />
        <Route exact path="/petprofile/:id" component={PetProfilePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
}

export default App;
