import React, { useState, useEffect } from 'react';
import '../AllProfiles/profiles.css';
import defaultAvatar from '../../Images/defaultUser.png';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
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
        <ProfileImg
          imgURL={userProfile.avatar ? userProfile.avatar : defaultAvatar}
        />
        <ProfileName
          name={userProfile.name}
          role={userProfile.owner ? 'pet owner' : 'pet sitter'}
        />
        <ProfileButtons
          role={userProfile.owner === true ? 'owner' : 'sitter'}
        />
      </div>
      <div id="right">
        <div id="right-flex">
          <About profileUser="Me" description={userProfile.description} />
          {userProfile.owner === true &&
            userProfile.ownedPets.map((id) => {
              return <PetCard key={id} petID={id} />;
            })}
        </div>
      </div>
      <Calendar />
    </div>
  );
};
export default UserProfilePage;
