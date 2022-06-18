import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Amentities from "../amentities/amentities.component";
import Categories from "../categories/categories.component";
import Currencies from "../currency/currencies.component";
import Rules from "../rules/rules.component";

export default function ScrollableTabsButtonAutoSetting() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example"
                             variant="scrollable"
                             scrollButtons="auto"
                    >
                        <Tab label="Amentities" value="1"/>
                        <Tab label="Categories" value="2"/>
                        <Tab label="Currencies" value="3"/>
                        <Tab label="Rules" value="4"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Amentities/>
                </TabPanel>
                <TabPanel value="2">
                    <Categories/>
                </TabPanel>
                <TabPanel value="3">
                    <Currencies/>
                </TabPanel>
                <TabPanel value="4">
                    <Rules/>
                </TabPanel>
            </TabContext>
        </Box>
    );
}