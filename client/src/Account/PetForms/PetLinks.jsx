import React, { useState, useContext } from 'react';
import '../account.css';
import '../../colors.css';
import axios from 'axios';
import { AppContext } from '../../Context/AppContext';
import { TextField, Button, Typography } from '@material-ui/core';

const PetLinks = ({ selectID, petUpdate }) => {
  const { setLoading } = useContext(AppContext);
  const [currentLink, setCurrentLink] = useState(null);

  const addLink = () => {
    setLoading(true);
    axios
      .post(`/pets/${selectID}/link`, currentLink)
      .then((response) => {
        alert('Link added!');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editLink = () => {
    setLoading(true);
    axios
      .put(`/pets/${selectID}/link/${currentLink?._id}`, currentLink)
      .then((response) => {
        alert('Link edited!');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLink || !currentLink.text || !currentLink.url) {
      return alert('Please fill both the text and url fields.');
    }
    if (currentLink?._id) {
      editLink();
    } else if (!currentLink?._id) {
      addLink();
    } else {
      alert('?');
    }
    let form = e.target;
    form.reset();
  };

  const deleteLink = (id) => {
    setLoading(true);
    axios
      .delete(`/pets/${selectID}/link/${id}`)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* LINK FORMS */}
      <Typography
        variant="h5"
        style={{ marginBottom: '10px', marginLeft: '20px', textAlign: 'left' }}
      >
        Add, Edit or Delete Links
      </Typography>
      <form
        onSubmit={handleSubmit}
        key={currentLink?._id}
        className="submit-links"
      >
        <TextField
          style={{ marginBottom: '15px' }}
          onChange={(e) =>
            setCurrentLink({ ...currentLink, [e.target.name]: e.target.value })
          }
          defaultValue={currentLink?.text}
          variant="outlined"
          label="Link Text"
          type="text"
          name="text"
        />
        <TextField
          onChange={(e) =>
            setCurrentLink({ ...currentLink, [e.target.name]: e.target.value })
          }
          defaultValue={currentLink?.url}
          variant="outlined"
          label="Link URL"
          type="text"
          name="url"
        />
        <Button type="submit" className="add-btn header-card-btn">
          Submit Form
        </Button>
        <Button
          onClick={() => setCurrentLink(null)}
          className="add-btn header-card-btn"
        >
          Clear Form to Create New Link?
        </Button>
      </form>

      {/* MAP THROUGH EXISTING LINKS */}
      {petUpdate?.data.links
        .map((el) => {
          return (
            <div key={el?._id} className="links-wrapper">
              <div className="links-btns">
                <Button
                  onClick={() =>
                    setCurrentLink({ _id: el._id, text: el.text, url: el.url })
                  }
                  className="edit-btn"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteLink(el._id)}
                  className="delete-btn"
                >
                  Delete
                </Button>
              </div>
              <div className="links-text">
                <span>
                  <b>Link:</b> {el.text}
                </span>
                <span>
                  <b>URL:</b> {el.url}
                </span>
              </div>
            </div>
          );
        })
        .reverse()}
    </>
  );
};

export default PetLinks;
