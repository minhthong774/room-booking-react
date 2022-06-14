import React, {useState} from 'react';

import './roomPage.style.scss';
import RoomTable from '../roomTable/roomTable.component';
import CustomizedInputBase from "../../../input base/InputBase.component";

function RoomPage() {
    const [searchText, setSearchText] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        setTriggerSearch(!triggerSearch);
    }

    return (
        <div className="rooms-page">
            <h1 className = "rooms-page-child">Rooms Management</h1>
            <div className = "rooms-page-child"> <CustomizedInputBase searchText={searchText} setSearchText={setSearchText} placeholder={"Search Room"} label={"search room"} handleSearch={handleSearch}/></div>
            <div className = "rooms-page-child"><RoomTable searchText={searchText} triggerSearch={triggerSearch}/></div>
        </div>
    )
}

export default RoomPage;