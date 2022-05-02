import React from 'react';
import './header.style.scss';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <div>
        <div className="nav">
            <div className="nav-left">
                <Link to={"/users"}>USER</Link>
                <Link to={"/rooms"}>ROOM</Link>
                <Link to={"/bookings"}>BOOKING</Link>
                <Link to={"/settings"}>SETTING</Link>
            </div>

            <div className="nav-right">
                <a href="/users">ACCOUNT</a>
            </div>
        </div>
        <div className="dash-horizon">
            
        </div>
        </div>
    )
}

export default Header;