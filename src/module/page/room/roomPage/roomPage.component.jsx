import React, {useEffect} from 'react';
import axios from 'axios';

import './roomPage.style.scss';
import RoomTable from '../roomTable/roomTable.component';

function RoomPage(){
    
    return(
        <div className="rooms-page">
            <h1>Rooms Management</h1>
            <RoomTable/>
        </div>
    )
}

export default RoomPage;