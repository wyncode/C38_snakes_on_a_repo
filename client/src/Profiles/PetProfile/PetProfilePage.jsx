import React from "react";
import "../AllProfiles/profiles.css";
import Calendar from "../AllProfiles/Calendar";
import ProfileImg from "../AllProfiles/ProfileImg";
import ProfileName from "../AllProfiles/ProfileName";
import ProfileButtons from "../AllProfiles/ProfileButtons";
import About from "../AllProfiles/About";
import PetInfo from "./PetInfo";

/// FAKE IMAGE DATA
import bird from "../../Images/bird.jpg";
import bird2 from "../../Images/bird2.jpg";
import banana1 from "../../Images/banana1.jpg";
import banana2 from "../../Images/banana2.jpg";
import fish from "../../Images/fish.jpg";
import hamster from "../../Images/hamster.jpg";
import rabbit from "../../Images/rabbit.jpg";
import snake from "../../Images/snake.jpg";
import spider from "../../Images/spider.jpg";

export default function PetProfilePage(props) {
  const { id } = props.match.params;

  const pets = [
    { img: snake, name: "Snake1 Name", role: "snake", id: 1 },
    { img: bird2, name: "Bird Name", role: "bird", id: 2 },
    { img: banana1, name: "Snake2 Name", role: "snake", id: 3 },
    { img: hamster, name: "Hamster Name", role: "hamster", id: 4 },
    { img: fish, name: "Fish Name", role: "fish", id: 5 },
    { img: rabbit, name: "Rabbit Name", role: "rabbit", id: 6 },
    { img: spider, name: "Spider Name", role: "spider", id: 7 },
    { img: bird, name: "Bird Name", role: "bird", id: 8 },
    { img: banana2, name: "Snake3 Name", role: "snake", id: 9 },
  ];

  let index = id;

  const instructions = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. \n\n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.  \n\n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.`;

  const links = [
    { url: "google.com", text: "google" },
    { url: "youtube.com", text: "youtube" },
    { url: "google.com", text: "google" },
    { url: "youtube.com", text: "youtube" },
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
}
