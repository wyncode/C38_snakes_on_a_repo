import React from "react";
import "../AllProfiles/profiles.css";
import "../../colors.css";
import { Typography, Card, CardContent } from "@material-ui/core";

export default function SitterInfo() {
  return (
    <Card elevation="3" className="gradient-border" id="sitter-info">
      <CardContent className="card-inside">
        <Typography
          className="card-title"
          gutterBottom
          variant="h6"
          component="h6"
        >
          Sitter Info:
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
      </CardContent>
    </Card>
  );
}
