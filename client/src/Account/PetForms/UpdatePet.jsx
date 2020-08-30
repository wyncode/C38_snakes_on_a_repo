import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';

const UpdatePet = ({
  setPetUpdateID,
  petUpdateID,
  setSelectID,
  selectID,
  currentPets
}) => (
  <div className="pet-select-id">
    <Typography variant="h5">Select a Pet to Update: </Typography>
    <FormControl className="tab-input" variant="outlined">
      <InputLabel id="type">Pet ID</InputLabel>
      <Select
        style={{ textAlign: 'left' }}
        value={selectID}
        name="_id"
        onChange={(e) => {
          setPetUpdateID({ ...petUpdateID, id: e.target.value });
          setSelectID(e.target.value);
        }}
        label="pet"
      >
        <MenuItem />
        {currentPets
          .map((petID) => (
            <MenuItem key={petID} value={petID}>
              {petID}
            </MenuItem>
          ))
          .reverse()}
      </Select>
    </FormControl>
  </div>
);

export default UpdatePet;
