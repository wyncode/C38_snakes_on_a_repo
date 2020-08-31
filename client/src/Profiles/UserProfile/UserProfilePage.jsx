import React, { useState, useEffect } from 'react';
import '../AllProfiles/profiles.css';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import About from '../AllProfiles/About';
import PetCard from './PetCard';

const UserProfilePage = ({ match }) => {
  const { id } = match.params;
  const [petOwner, setPetOwner] = useState({
    owner: false,
    ownedPets: [],
    description: '',
    name: ''
  });

  useEffect(() => {
    fetch(`/users/${id}`)
      .then((res) => res.json())
      .then((petOwner) => {
        setPetOwner(petOwner);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div id="profile-container">
      <div id="topleft">
        <ProfileImg imgURL={petOwner.avatar} />
        <ProfileName
          name={petOwner.name}
          role={petOwner.owner ? 'pet owner' : 'pet sitter'}
        />
        <ProfileButtons role={petOwner.owner === true ? 'owner' : 'sitter'} />
      </div>
      <div id="right">
        <div id="right-flex">
          <About profileUser="Me" description={petOwner.description} />
          {petOwner.owner === true &&
            petOwner.ownedPets.map((id) => {
              return <PetCard key={id} petID={id} />;
            })}
        </div>
      </div>
      <Calendar />
    </div>
  );
};
export default UserProfilePage;
