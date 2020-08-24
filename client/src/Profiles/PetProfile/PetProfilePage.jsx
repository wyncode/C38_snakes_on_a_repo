import React from 'react';
import '../AllProfiles/profiles.css';
import Calendar from '../AllProfiles/Calendar';
import ProfileImg from '../AllProfiles/ProfileImg';
import ProfileName from '../AllProfiles/ProfileName';
import ProfileButtons from '../AllProfiles/ProfileButtons';
import About from '../AllProfiles/About';
import PetInfo from './PetInfo';

/// PLACEHOLDER  IMAGE DATA
import snake from '../../Images/snake.jpg';
import spider from '../../Images/spider.jpg';

const PetProfilePage = (props) => {
  const { id } = props.match.params;
  let index = id;

  const pets = [
    { img: snake, name: 'Snake1 Name', role: 'snake', id: 1 },
    { img: spider, name: 'Spider Name', role: 'spider', id: 2 }
  ];

  const instructions = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.`;

  const links = [
    { url: 'google.com', text: 'google' },
    { url: 'youtube.com', text: 'youtube' }
  ];

  return (
    <div id="profile-container">
      <div id="topleft">
        <ProfileImg imgURL={pets[index - 1].img} />
        <ProfileName name={pets[index - 1].name} role={pets[index - 1].role} />
        <ProfileButtons leftLink="Share" rightLink="Owner" />
      </div>
      <div id="right">
        <About profileUser="The Pet" />
        <PetInfo title="Links" links={links} />
        <PetInfo title="Feeding Instructions" instructions={instructions} />
        <PetInfo title="Cleaning Instructions" instructions={instructions} />
        <PetInfo title="Exercise Instructions" instructions={instructions} />
        <PetInfo title="Medical Instructions" instructions={instructions} />
        <PetInfo title="Additional Instructions" instructions={instructions} />
        <PetInfo title="Emergency Instructions" instructions={instructions} />
      </div>
      <Calendar />
    </div>
  );
};
export default PetProfilePage;
