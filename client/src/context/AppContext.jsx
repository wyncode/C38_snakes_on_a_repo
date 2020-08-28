import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPets, setCurrentPets] = useState(null);
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    if (user && !currentUser) {
      axios
        .get('/user/me', { withCredentials: true })
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser, user]);

  useEffect(() => {
    if (currentUser) {
      currentUser.ownedPets.forEach(pet => {
        axios.get(`/pets/${pet}`)
         .then(({data}) => {
          //  console.log("axios data", data)
           setCurrentPets({...currentPets, [data.name]: data });
          //  console.log("axios current pets", currentPets);
         })
        .catch((error) => console.log(error));
        });
    }
  }, [currentUser]);

  // console.log("current pets", currentPets);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
