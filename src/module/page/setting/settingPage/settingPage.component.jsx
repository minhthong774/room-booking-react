import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ScrollableTabsButtonAutoSetting from "./scrollableTabsButtonAutoSetting.component";

export default function SettingPage() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container sx={{width: '100%', p: 1}}>
                <Box sx={{bgcolor: '#ffffff', height: '100vh', width: '100%'}}>
                    <ScrollableTabsButtonAutoSetting/>
                </Box>
            </Container>
        </React.Fragment>
    )
}