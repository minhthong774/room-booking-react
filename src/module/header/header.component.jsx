import React from 'react';
import './header.style.scss';
import {Link} from 'react-router-dom';
import AccountMenu from '../accountMenu/accountMenu.component';

function Header({token}){
    return(
        <div>
        <div className="nav">
            <div className="nav-left">
                <Link to={"/users"}>USER</Link>
                <Link to={"/rooms"}>ROOM</Link>
                <Link to={"/bookings"}>BOOKING</Link>
                <Link to={"/settings"}>SETTING</Link>
                <Link to={"/stats"}>STATS</Link>
            </div>

            <div className="nav-right">
                <AccountMenu token={token}/>
            </div>
        </div>
        <div className="dash-horizon">
            
        </div>
        </div>
    )
}

export default Header;