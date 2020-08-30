import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import Avatar from '../Avatar';
import PetLinks from './PetLinks';
import UpdatePet from './UpdatePet';
import AddPet from './AddPet';
import '../account.css';
import '../../colors.css';

const PetForm = ({ form }) => {
  const { currentPets, setCurrentPets, loading, setLoading } = useContext(
    AppContext
  );
  const [formData, setFormData] = useState({});
  const [petUpdateID, setPetUpdateID] = useState(null);
  const [petUpdate, setPetUpdate] = useState(null);
  const [type, setType] = useState('');
  const [selectID, setSelectID] = useState('');

  useEffect(() => {
    if (petUpdateID) {
      axios
        .get(`/pets/${petUpdateID?.id}`)
        .then(({ data }) => {
          setPetUpdate({ ...petUpdate, data });
          setType(data.type);
        })
        .catch((error) => console.log(error));
    }
  }, [petUpdateID, loading, currentPets]);

  const submitNewPet = () => {
    if (!formData.description || !formData.name || !formData.type) {
      return alert('Name, type and description are required');
    }

    axios
      .post('/pets', formData)
      .then(() => {
        alert('Successfully added pet');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong...');
      });
  };

  const updatePet = () => {
    if (!selectID) {
      alert('Please select a pet to update!');
    }
    axios
      .put(`/pets/${selectID}`, formData)
      .then(() => {
        alert('Successfully updated pet');
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong...');
      });
  };

  const deletePet = () => {
    window.confirm(
      'Warning: this action is permanent. Are you SURE you want to delete this pet forever?'
    );
    setLoading(true);
    axios
      .delete(`/pets/${selectID}`)
      .then(() => {
        alert('Pet deleted!');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setCurrentPets(
      currentPets.filter((petID) => {
        return petID !== selectID;
      })
    );
    setSelectID('');
  };

  const isAdd = form === 'add';
  const isUpdate = form === 'update';

  return (
    <div id="pet-forms-container">
      {/* SELECT WHICH PET TO UPDATE, IF ON UPDATE TAB */}
      {isUpdate && (
        <UpdatePet
          setPetUpdateID={setPetUpdateID}
          petUpdateID={petUpdateID}
          setSelectID={setSelectID}
          selectID={selectID}
          currentPets={currentPets || []}
        />
      )}
      {/* HIDE FORMS ON PET UPDATE UNLESS PET IS SELECTED */}
      {((isUpdate && selectID) || isAdd) && (
        <>
          {/* SHOW/HIDE UPLOAD AVATAR COMPONENT */}
          {isUpdate && (
            <div
              className="pet-form-avatar"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Avatar role={'pets'} petUpdate={petUpdate} />
            </div>
          )}
          {/* EDIT/ADD LINKS */}
          <div
            className={isAdd ? 'pet-form-links links-add' : 'pet-form-links'}
            key={petUpdate?.data.name}
          >
            <PetLinks selectID={selectID} petUpdate={petUpdate} />
          </div>
          {/* PET INFORMATION FORM */}
          <AddPet
            submitNewPet={submitNewPet}
            updatePet={updatePet}
            petUpdate={petUpdate}
            isAdd={isAdd}
            formData={formData}
            setFormData={setFormData}
            setType={setType}
            deletePet={deletePet}
            type={type}
          />
        </>
      )}
    </div>
  );
};

export default PetForm;
