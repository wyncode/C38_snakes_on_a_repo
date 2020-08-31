import React from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';

const petTypes = [
  'reptile',
  'amphibian',
  'mammal',
  'fish',
  'arachnid/insect',
  'other'
];

const basicInfoFields = [
  'description',
  'emergency',
  'medical',
  'feeding',
  'cleaning',
  'exercise',
  'additional'
];

const AddPet = ({
  submitNewPet,
  updatePet,
  petUpdate,
  isAdd,
  setFormData,
  type,
  setType,
  deletePet,
  formData
}) => (
  <form
    className="pet-info-form"
    key={petUpdate?.data._id}
    onSubmit={isAdd ? submitNewPet : updatePet}
  >
    <Typography variant="h5" component="div" style={{ marginBottom: '10px' }}>
      {isAdd ? 'New Pet Information' : 'Update Pet Information'}
    </Typography>

    <div className="forms-container">
      {/* UPDATE PET NAME */}
      <TextField
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        defaultValue={petUpdate?.data.name}
        className="tab-input"
        variant="outlined"
        label="name"
        type="text"
        name="name"
        required
      />

      {/* SELECT PET TYPE */}
      <FormControl className="tab-input" variant="outlined">
        <InputLabel id="type">Pet Type</InputLabel>
        <Select
          style={{ textAlign: 'left' }}
          value={type}
          name="type"
          onChange={(e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value
            });
            setType(e.target.value);
          }}
          label="type"
        >
          <MenuItem />
          {petTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* MAP THROUGH TO CREATE REST OF TEXT FIELD INPUTS */}
      {basicInfoFields.map((field) => (
        <TextField
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value
            })
          }
          defaultValue={petUpdate?.data[field]}
          key={field}
          className="tab-input"
          variant="outlined"
          label={`${field === 'description' ? field : field + ' instructions'}`}
          type="text"
          name={field}
          multiline
          required={field === 'description'}
          rows="5"
        />
      ))}

      {/* SUBMIT FORM */}
      <div className="pet-info-submit">
        <Button type="submit" className="header-card-btn pet-btn">
          Submit Changes
        </Button>
        {petUpdate && (
          <Button
            onClick={deletePet}
            className="header-card-btn pet-btn"
            style={{ background: 'red' }}
          >
            Delete Pet
          </Button>
        )}
      </div>
    </div>
  </form>
);

export default AddPet;
