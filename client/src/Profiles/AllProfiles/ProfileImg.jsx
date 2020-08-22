import React from "react";
import "./profiles.css";
import "../../colors.css";
import Card from "@material-ui/core/Card";

export default function ProfileImg({ imgURL }) {
  return (
    <Card
      elevation="3"
      id="pro-img"
      style={{
        backgroundImage: `url('${imgURL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></Card>
  );
}
