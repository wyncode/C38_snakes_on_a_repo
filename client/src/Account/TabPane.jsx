import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Typography} from '@material-ui/core'
import UpdateAccount from './UpdateAccount'
import PetForm from './PetForm'

const TabPane = () => {
    return (
    <Typography component="div">
    <Tabs style={{borderBottom: "1px solid black", marginTop: "50px", width: "95vw"}}>
        <TabList style={{fontWeight: "bold"}}>
            <Tab>Account</Tab>
            <Tab>Update Pet</Tab>
            <Tab>Add Pet</Tab>
            <Tab>Favorites</Tab>
        </TabList>
    
        <TabPanel>
            <UpdateAccount />
        </TabPanel>
        <TabPanel>
            <PetForm />
        </TabPanel>
        <TabPanel>
            <PetForm />
        </TabPanel>
        <TabPanel>
            <h2>Favorites</h2>
        </TabPanel>
    </Tabs>
    </Typography>
    )
}

export default TabPane;
