import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import {Button} from '@material-ui/core';

const Logout = ({styleType}) => {
  const history = useHistory();
  const { setCurrentUser } = useContext(AppContext);

  const handleLogOut = () => {
    axios.post('/user/logout',{ withCredentials: true} )
    .then(() => {
        setCurrentUser(null);
        sessionStorage.removeItem('user');
        history.push('/login');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Button style={styleType} onClick={handleLogOut}>Logout</Button>
  );
};

export default Logout;
