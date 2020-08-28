import React, { useState, useContext, useEffect } from 'react';
import '../account.css';
import '../../colors.css';
import axios from 'axios';
import Avatar from '../Avatar';
import { AppContext } from '../../Context/AppContext';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

const PetForm = ({ form }) => {
  const { currentUser } = useContext(AppContext);
  const [formData, setFormData] = useState({});
  const [petUpdateID, setPetUpdateID] = useState(null);
  const [petUpdate, setPetUpdate] = useState(null);
//   const [links, setLinks] = useState({text: "", url: ""})
  console.log(formData)
//   console.log("current pets", currentPets);

    useEffect(() => {
        if (petUpdateID) {
            axios.get(`/pets/${petUpdateID?.id}`)
        .then(({data}) => {
        setPetUpdate({...petUpdate, data });
        })
    .catch((error) => console.log(error));
        } 
    }, [petUpdateID])
    

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
    axios.put(`/pets/${petUpdateID.id}`, formData)
      .then((response) => {
        console.log(response.data);
        alert('Successfully updated pet');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong...');
      });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    form === "add" ? submitNewPet() : updatePet();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar role={'pets'} petUpdate={petUpdate}/>
      </div>
      <form className="tab-content" onSubmit={handleSubmit}>
        <div className="tab-grid" key={petUpdate?.data._id}>

          {/* SELECT WHICH PET TO UPDATE BY NAME, IF ON UPDATE TAB */}
          {form === 'update' && (
            <FormControl className="tab-input" variant="outlined">
              <InputLabel id="type">Pet Name</InputLabel>
              <Select
                labelId="pet"
                id="pet"
                value=""
                name="_id"
                onChange={(e) => setPetUpdateID({ ...petUpdateID, "id": e.target.value })}                label="pet"
                >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {currentUser.ownedPets &&
                  currentUser.ownedPets.map((petID, index) => {
                    return (
                      <MenuItem key={index} value={petID}>
                        {petID}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          )}

          {/* UPDATE PET NAME */}
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            defaultValue={petUpdate?.data.name}
            className="tab-input"
            variant="outlined"
            id="name"
            label="name"
            type="text"
            name="name"
            required
          />

          {/* SELECT PET TYPE */}
          <FormControl className="tab-input" variant="outlined">
            <InputLabel id="type">Pet Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value=""
              name="type"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              label="type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {['reptile', 'amphibian', 'mammal', 'fish', 'arachnid/insect', 'other'].map(type => {
                  return <MenuItem key={type} value={type}>{type}</MenuItem>
              })}
            </Select>
          </FormControl>

          {/* UPDATE PET DESCRIPTION */}
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            defaultValue={petUpdate?.data.description}
            className="tab-input"
            variant="outlined"
            id="description"
            label="description"
            type="text"
            name="description"
            multiline
            required
            rows="10"
          />
        </div>
        <div className="tab-grid" key={petUpdate?.data.name}>
            
          {/* MAP THROUGH TO CREATE LINKS */}
          {[
            { text: 'link one', url: 'linkOne' },
            { text: 'link two', url: 'linkTwo' },
            { text: 'link three', url: 'linkThree' }
          ].map((el, index) => {
            return (
              <span className="tab-input" key={index}>
                <TextField
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    marginTop: '-1px'
                  }}
                  variant="outlined"
                  id={el.url}
                  label={el.text}
                  type="text"
                  name={el.url}
                />
                <TextField
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    marginTop: '-1px'
                  }}
                  variant="outlined"
                  id={`${el.url}URL`}
                  label={`${el.text} URL`}
                  type="text"
                  name={`${el.url}URL`}
                />
              </span>
            );
          })}
        </div>
        <div className="tab-grid" key={petUpdate?.data.type}>

          {/* MAP THROUGH TO CREATE REST OF TEXT FIELD INPUTS */}
          {['medical', 'feeding', 'cleaning', 'exercise', 'additional'].map(
            (el) => {
              return (
                <TextField
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value
                    })
                  }
                  defaultValue={petUpdate?.data[el]}
                  key={el}
                  className="tab-input"
                  variant="outlined"
                  id={el}
                  label={`${el} instructions`}
                  type="text"
                  name={el}
                  multiline
                  rows="5"
                />
              );
            }
          )}
        </div>
        <div className="tab-grid">
          <Button
            type="submit"
            className="header-card-btn"
            style={{ width: '100%', height: '50px' }}
          >
            Submit Changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default PetForm;
