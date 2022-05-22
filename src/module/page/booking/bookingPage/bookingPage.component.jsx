import React, {useEffect} from 'react';
import axios from 'axios';

import './bookingPage.style.scss';
import BookingTable from '../bookingTable/bookingTable.component';

function BookingPage(){
    
    return(
        <div className="rooms-page">
            <h1>Booking Management</h1>
            <BookingTable/>
        </div>
    )
}

export default BookingPage;