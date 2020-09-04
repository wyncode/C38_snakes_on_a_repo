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
// import ForgetPassword from './Login/ForgetPassword';
import LoggedInRoute from './Routes/LoggedInRoute';
import UpdatePassword from './Login/UpdatePassword';
import { AppContextProvider } from './context/AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import VideoChat from './VideoChat/VideoChat';

const App = () => {
	return (
		<AppContextProvider>
			<Router>
				<Nav />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/search" component={SearchPage} />
					<Route exact path="/userprofile/:id" component={UserProfilePage} />
					<Route exact path="/petprofile/:id" component={PetProfilePage} />
					<Route exact path="/videochat" component={VideoChat} />
					<LoggedInRoute exact path="/login" component={LoginPage} />
					<LoggedInRoute exact path="/register" component={RegisterPage} />
					<SecureRoute exact path="/account" component={AccountPage} />
					<SecureRoute exact path="/map" component={LocationSearchPage} />
				</Switch>
			</Router>
		</AppContextProvider>
	);
};

export default App;
