import React from 'react';
import '../AllProfiles/profiles.css';
import '../../colors.css';
import {
  CardMedia,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const PetCard = (props) => {
  const history = useHistory();

  return (
    <Card elevation={3} className="pet-card gradient-border">
      <CardMedia
        className="pet-card-img"
        component="img"
        alt="pet-img"
        image={props.petIMG}
        title="pet-img"
      />
      <CardContent className="card-inside">
        <Typography className="pet-card-title" variant="h5" component="h5">
          {props.petName}
        </Typography>
      </CardContent>
      <CardActions className="pet-card-btns card-inside">
        <Button
          onClick={() => history.push(`/petprofile/${props.petID}`)}
          className="card-btn"
          variant="contained"
        >
          Go To Pet {props.petID}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PetCard;
