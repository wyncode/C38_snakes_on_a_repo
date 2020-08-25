import React from 'react';
import '../AllProfiles/profiles.css';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import About from '../AllProfiles/About';
import SitterInfo from './SitterInfo';

/// PLACEHOLDER IMAGE DATA
import sitter from '../../Images/man4.jpg';

const SitterProfilePage = () => {
  return (
    <div id="profile-container">
      <div id="topleft">
        <ProfileImg imgURL={sitter} />
        <ProfileName name="Sitter Name" role="pet sitter" />
        <ProfileButtons leftLink="Tip Me!" rightLink="Chat" />
      </div>
      <div id="right">
        <About profileUser="Me" />
        <SitterInfo />
      </div>
      <Calendar />
    </div>
  );
};
export default SitterProfilePage;
