import React, { useState, useContext, useEffect } from 'react';
import '../account.css';
import '../../colors.css';
import axios from 'axios';
import Avatar from '../Avatar';
import PetLinks from './PetLinks';
import { AppContext } from '../../Context/AppContext';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';

const PetForm = ({ form }) => {
  const { currentUser, loading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [petUpdateID, setPetUpdateID] = useState(null);
  const [petUpdate, setPetUpdate] = useState(null);
  const [type, setType] = useState('');
  const [selectID, setSelectID] = useState('');

  useEffect(() => {
    if (petUpdateID) {
        axios.get(`/pets/${petUpdateID?.id}`)
        .then(({data}) => {
          setPetUpdate({...petUpdate, data });
          setType(data.type);
        })
    .catch((error) => console.log(error));
    } 
  }, [petUpdateID, loading])

  const submitNewPet = () => {
    if (!formData.description || !formData.name || !formData.type) {
      return alert('Name, type and description are required');
    }
    axios.post('/pets', formData)
      .then((response) => {
        console.log(response.data);
        alert('Successfully added pet');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong...');
      });
  };

  const updatePet = () => {
    if (!selectID) { alert('Please select a pet to update!') };
    axios.put(`/pets/${selectID}`, formData)
      .then((response) => {
        console.log(response.data);
        alert('Successfully updated pet');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong...');
      });
  };

  return (
    <div id="pet-forms-container">

    {/* SELECT WHICH PET TO UPDATE, IF ON UPDATE TAB */}
    {form === 'update' && (
      <div className="pet-select-id">
      <Typography variant="h5">Select a Pet to Update: </Typography>
      <FormControl className="tab-input" variant="outlined">
        <InputLabel id="type">Pet ID</InputLabel>
        <Select
          style={{textAlign: "left"}}
          value={selectID}
          name="_id"
          onChange={(e) => {
            setPetUpdateID({ ...petUpdateID, "id": e.target.value });
            setSelectID(e.target.value);
          }}
          label="pet"
          >
          <MenuItem />
          {currentUser?.ownedPets &&
            currentUser.ownedPets.map((petID, index) => {
              return (
                <MenuItem key={index} value={petID}>
                  {petID}
                </MenuItem>
              );
          })}
        </Select>
      </FormControl>
      </div>
    )}

  {/* HIDE FORMS ON PET UPDATE UNLESS PET IS SELECTED */}
  {((form === "update" && selectID) || form === "add") &&
    <>

    {/* SHOW/HIDE UPLOAD AVATAR COMPONENT */}
    {form === "update" &&
      <div className="pet-form-avatar" style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar role={'pets'} petUpdate={petUpdate}/>
      </div>
    }

    {/* EDIT/ADD LINKS */}
    <div className={(form === "add") ? "pet-form-links links-add" : "pet-form-links"} key={petUpdate?.data.name}>        
      <PetLinks selectID={selectID} petUpdate={petUpdate} />
    </div>


    {/* PET INFORMATION FORM */}
    <form className="pet-info-form" key={petUpdate?.data._id} onSubmit={() => form === "add" ? submitNewPet() : updatePet()}>
    
    <Typography variant="h5" component="div" style={{marginBottom: "10px"}}>Pet Information</Typography>

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
          style={{textAlign:"left"}}
          value={type}
          name="type"
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
            setType(e.target.value);
          }}
          label="type"
        >
          <MenuItem />
          {['reptile', 'amphibian', 'mammal', 'fish', 'arachnid/insect', 'other'].map(type => {
              return <MenuItem key={type} value={type}>{type}</MenuItem>
          })}
        </Select>
      </FormControl>
 
    {/* MAP THROUGH TO CREATE REST OF TEXT FIELD INPUTS */}
      {['description', 'emergency', 'medical', 'feeding', 'cleaning', 'exercise', 'additional'].map(
        (el) => {
          return (
            <TextField
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              defaultValue={petUpdate?.data[el]}
              key={el}
              className="tab-input"
              variant="outlined"
              label={`${el === 'description' ? el : el + ' instructions'}`}
              type="text"
              name={el}
              multiline
              required={el === 'description' ? true : false}
              rows="5"
            />
          );
      })}

      {/* SUBMIT FORM */}
        <div className="pet-info-submit">
          <Button
            type="submit"
            className="header-card-btn"
            style={{ width: '50%', height: '50px' }}
          >
            Submit Changes
          </Button>
        </div>
        </div>
      </form>

      </>
    }
    </div>
  );
};

export default PetForm;