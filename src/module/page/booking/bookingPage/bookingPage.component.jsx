import React, {useState} from 'react';

import './bookingPage.style.scss';
import BookingTable from '../bookingTable/bookingTable.component';
import CustomizedInputBase from "../../../input base/InputBase.component";

function BookingPage() {
    const [searchText, setSearchText] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        setTriggerSearch(!triggerSearch);
    }

    return (
        <div className="bookings-page">
            <h1 className={"bookings-page-child"}>Booking Management</h1>
            <div className = "bookings-page-child"> <CustomizedInputBase searchText={searchText} setSearchText={setSearchText} placeholder={"Search Room"} label={"search room"} handleSearch={handleSearch}/></div>
            <div className={"bookings-page-child"}><BookingTable  searchText={searchText} triggerSearch={triggerSearch}/></div>
        </div>
    )
}

export default BookingPage;