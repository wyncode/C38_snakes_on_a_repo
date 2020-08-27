import React from 'react'
import './account.css'
import '../colors.css'
import {TextField, Button} from '@material-ui/core'

const UpdateAccount = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }
    return (
        <form className="tab-content" onSubmit={handleSubmit}>
        <div className="tab-grid">
            <div className="avatar-preview profile-image"></div>
            <label htmlFor="avatar">Choose a profile picture:</label>
            <input type="file" id="avatar" name="avatar" accept="image/*"  style={{marginBottom: "30px"}}/>
        </div>
        <div className="tab-grid">
            <TextField
            className="tab-input"
              variant="outlined"
              id="name"
              label="name"
              type="text"
              name="name"
            />
            <TextField
            className="tab-input"
              variant="outlined"
              id="email"
              label="email"
              type="email"
              name="email"
            />
            <TextField
              className="tab-input"
              variant="outlined"
              id="password"
              label="password"
              type="password"
              name="password"
            />
            <TextField
            className="tab-input"
              variant="outlined"
              id="confirm-password"
              label="confirm password"
              type="password"
              name="confirmPassword"
            />
            </div>
        <div className="tab-grid">
            <TextField
            className="tab-input"
              variant="outlined"
              id="description"
              label="description"
              type="text"
              name="description"
              multiline
              rows="12"
            />
          </div>
        <div className="tab-grid">
            <Button type="submit" className="header-card-btn" style={{width: "100%", height: "50px"}}>Submit Changes</Button>
        </div>     
        </form>
    )
}

export default UpdateAccount
