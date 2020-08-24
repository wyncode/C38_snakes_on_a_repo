import React from 'react';
import '../AllProfiles/profiles.css';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import About from '../AllProfiles/About';
import PetCard from './PetCard';

/// PLACEHOLDER  IMAGE DATA
import owner from '../../Images/man.jpg';
import snake from '../../Images/snake.jpg';
import spider from '../../Images/spider.jpg';

const OwnerProfilePage = () => {
  const pets = [
    { img: snake, name: 'Snake1 Name', id: 1 },
    { img: spider, name: 'Spider Name', role: 'spider', id: 2 }
  ];

  return (
    <div id="profile-container">
      <div id="topleft">
        <ProfileImg imgURL={owner} />
        <ProfileName name="Owner Name" role="pet owner" />
        <ProfileButtons leftLink="Video Call" rightLink="Chat" />
      </div>
      <div id="right">
        <About profileUser="Me" />
        <div id="right-flex">
          {pets.map((img) => {
            return (
              <PetCard
                key={img.id}
                petID={img.id}
                petName={img.name}
                petIMG={img.img}
              />
            );
          })}
        </div>
      </div>
      <Calendar />
    </div>
  );
};
export default OwnerProfilePage;
