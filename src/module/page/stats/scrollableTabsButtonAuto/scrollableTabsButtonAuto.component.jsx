import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import IncomeChart from '../IncomeChart/IncomeChart.component';
import UserChart from '../UserChart/UserChart.component';

export default function ScrollableTabsButtonAuto() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="INCOME" value="1" />
            <Tab label="New Users" value="2" />
            <Tab label="New Rooms" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <IncomeChart/>
        </TabPanel>
        <TabPanel value="2">
          <UserChart/>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}