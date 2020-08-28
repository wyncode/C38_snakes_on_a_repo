import React, {useState, useContext} from 'react';
import './account.css';
import '../colors.css';
import { AppContext } from '../Context/AppContext';
import {TextField, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';

const PetForm = () => {
    const [formData, setFormData] = useState(null);
    const [type, setType] = useState('');
    const { currentUser } = useContext(AppContext);

    const handleSubmit = (e) => {
     e.preventDefault();
      }

      const instructions = ["medical", "feeding", "cleaning", "exercise", "additional"]
      const links = [{text: "link one", url: "linkOne"}, {text: "link two", url: "linkTwo"}]

        return (
            <form className="tab-content" onSubmit={handleSubmit}>
            <div className="tab-grid">
                <div
                className="avatar-preview profile-image"
                ></div>
                <label htmlFor="avatar">Choose a profile picture:</label>
                <input type="file" id="avatar" name="avatar" accept="image/*"  style={{marginBottom: "30px"}}/>
            </div>
            <div className="tab-grid">
                <TextField
                onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
                className="tab-input"
                variant="outlined"
                id="name"
                label="name"
                type="text"
                name="name"
                />
                <FormControl className="tab-input" variant="outlined">
                    <InputLabel id="type">Pet Type</InputLabel>
                    <Select
                    labelId="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="type"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'reptile'}>Reptile</MenuItem>
                    <MenuItem value={'amphibian'}>Amphibian</MenuItem>
                    <MenuItem value={'mammal'}>Mammal</MenuItem>
                    <MenuItem value={'fish'}>Fish</MenuItem>
                    <MenuItem value={'arachnic/insect'}>Arachnid/Insect</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField
                    onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
                    className="tab-input"
                    variant="outlined"
                    id="description"
                    label="description"
                    type="text"
                    name="description"
                    multiline
                    rows="5"
                />

                {links.map((el, index) => {
                    return (
                        <span key={index}>
                        <TextField
                            className="tab-input"
                            variant="outlined"
                            id={el.url}
                            label={el.text}
                            type="text"
                            name={el.url}
                            />
                            <TextField
                            className="tab-input"
                            variant="outlined"
                            id={`${el.url}URL`}
                            label={`${el.text} URL`}
                            type="text"
                            name={`${el.url}URL`}
                            />
                         </span>
                    )
                })}
                
            </div>
            <div className="tab-grid">
                {instructions.map(el => {
                    return (
                        <TextField
                            onChange={((e) => setFormData({ ...formData, [e.target.name]: e.target.value }))}
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
                    )
                })}
              </div>
            <div className="tab-grid">
                <Button type="submit" className="header-card-btn" style={{width: "100%", height: "50px"}}>Submit Changes</Button>
            </div>     
            </form>
        )
    }

export default PetForm
