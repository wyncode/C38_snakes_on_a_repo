import React from "react";
import "./profiles.css";
import "../../colors.css";
import Button from "@material-ui/core/Button";

export default function ProfileButton(props) {
  return (
    <div id="pro-btn-wrapper">
      <Button variant="contained" className="pro-btn" id="btn1">
        {props.leftLink}
      </Button>
      <Button variant="contained" className="pro-btn" id="btn2">
        {props.rightLink}
      </Button>
    </div>
  );
}
