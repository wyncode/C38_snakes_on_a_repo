import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Typography } from '@material-ui/core';
import UpdateAccount from './UserForms/UpdateAccount';
import PetForm from './PetForms/PetForm';
import { AppContext } from '../Context/AppContext';

const TabPane = () => {
  const { currentUser } = useContext(AppContext);

  return (
    <Typography component="div">
      <Tabs
        style={{
          borderBottom: '1px solid black',
          marginTop: '50px',
          width: '95vw'
        }}
      >
        <TabList style={{ fontWeight: 'bold' }}>
          <Tab>Account</Tab>
          {currentUser?.owner && (
            <>
              <Tab>Update Pet</Tab>
              <Tab>Add Pet</Tab>
            </>
          )}
          <Tab>Favorites</Tab>
        </TabList>

        <TabPanel>
          <UpdateAccount />
        </TabPanel>
        {currentUser?.owner && (
          <>
            <TabPanel>
              <PetForm form={'update'} />
            </TabPanel>
            <TabPanel>
              <PetForm form={'add'} />
            </TabPanel>
          </>
        )}
        <TabPanel>
          <h2>Favorites</h2>
        </TabPanel>
      </Tabs>
    </Typography>
  );
};

export default TabPane;
