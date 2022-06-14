import React from 'react';
import './statisticPage.style.scss';
import ScrollableTabsButtonAuto from '../scrollableTabsButtonAuto/scrollableTabsButtonAuto.component.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function StatisticPage() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container sx={{width: '100%', p: 1}}>
                <Box sx={{bgcolor: '#ffffff', height: '100vh', width: '100%'}}>
                    <ScrollableTabsButtonAuto/>
                </Box>
            </Container>
        </React.Fragment>
    )
}