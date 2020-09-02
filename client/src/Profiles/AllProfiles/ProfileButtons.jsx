import React from 'react';
import './profiles.css';
import '../../colors.css';
import Button from '@material-ui/core/Button';
import MailModal from '../UserProfile/MailModal';
import { Link, useHistory } from 'react-router-dom';

const ProfileButton = ({ role, ownerID, userEmail }) => {
	const history = useHistory();

	return (
		<div id="profile-btn-wrapper">
			{/* LEFT BUTTON */}
			<MailModal role={role} userEmail={userEmail} />

			{/* RIGHT BUTTON */}
			{ownerID ? (
				<Button onClick={() => history.push(`/userprofile/${ownerID}`)} variant="contained" id="btn2">
					Owner
				</Button>
			) : (
				<Button variant="contained" component={Link} to={'/videochat'} id="btn2">
					VideoCall
				</Button>
			)}
		</div>
	);
};

export default ProfileButton;
