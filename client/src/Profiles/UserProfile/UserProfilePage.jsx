import React, { useState, useEffect } from 'react';
import '../AllProfiles/profiles.css';
import defaultAvatar from '../../Images/defaultUser.png';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import Payment from './Payment';
import About from '../AllProfiles/About';
import PetCard from './PetCard';

const UserProfilePage = ({ match }) => {
  const { id } = match.params;
  const [userProfile, setUserProfile] = useState({
    owner: false,
    ownedPets: [],
    description: '',
    name: ''
  });

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((res) => res.json())
      .then((user) => {
        setUserProfile(user);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div id="profile-container">
      <div id="topleft">
        <ProfileImg imgURL={userProfile.avatar || defaultAvatar} />
        <ProfileName
          name={userProfile.name}
          role={userProfile.owner ? 'pet owner' : 'pet sitter'}
          heartRole="user"
          id={userProfile._id}
        />
        <ProfileButtons role="user" userEmail={userProfile.email} />
        {!userProfile.owner && (
          <div id="payment">
            <Payment />
          </div>
        )}
      </div>
      <div id="right">
        <About profileUser="Me" description={userProfile.description} />
        <div id="right-flex">
          {userProfile.owner &&
            userProfile.ownedPets.map((id) => {
              return <PetCard key={id} petID={id} />;
            })}
        </div>
      </div>
      <Calendar id={id} />
    </div>
  );
};
export default UserProfilePage;
