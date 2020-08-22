import React from "react";
import "../AllProfiles/profiles.css";
import Calendar from "../AllProfiles/Calendar";
import ProfileImg from "../AllProfiles/ProfileImg";
import ProfileName from "../AllProfiles/ProfileName";
import ProfileButtons from "../AllProfiles/ProfileButtons";
import About from "../AllProfiles/About";
import PetCard from "./PetCard";

/// FAKE IMAGE DATA
import owner from "../../Images/man.jpg";
import bird from "../../Images/bird.jpg";
import bird2 from "../../Images/bird2.jpg";
import banana1 from "../../Images/banana1.jpg";
import banana2 from "../../Images/banana2.jpg";
import fish from "../../Images/fish.jpg";
import hamster from "../../Images/hamster.jpg";
import rabbit from "../../Images/rabbit.jpg";
import snake from "../../Images/snake.jpg";
import spider from "../../Images/spider.jpg";

export default function OwnerProfilePage() {
  const pets = [
    { img: snake, name: "Snake1 Name", id: 1 },
    { img: bird2, name: "Bird Name", id: 2 },
    { img: banana1, name: "Snake2 Name", id: 3 },
    { img: hamster, name: "Hamster Name", id: 4 },
    { img: fish, name: "Fish Name", id: 5 },
    { img: rabbit, name: "Rabbit Name", id: 6 },
    { img: spider, name: "Spider Name", id: 7 },
    { img: bird, name: "Bird Name", id: 8 },
    { img: banana2, name: "Snake3 Name", id: 9 },
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
}
