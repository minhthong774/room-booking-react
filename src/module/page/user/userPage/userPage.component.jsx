import React, {useState} from 'react';
import UsersTable from '../userTable/userTable.component';
import AddUser from '../addUser/addUser.component.jsx';

import './userPage.style.scss';
import CustomizedInputBase from "../../../input base/InputBase.component";

function Users() {
    const [searchText, setSearchText] = useState("");
    const [triggerSearch, setTriggerSearch] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        setTriggerSearch(!triggerSearch);
    }

    return (
        <div className="users-page">
            <h1 className = "child">Users Management</h1>
            <div className = "action-container child">
                <CustomizedInputBase searchText={searchText} setSearchText={setSearchText} placeholder={"Search User"} label={"search user"} handleSearch={handleSearch}/>
                <AddUser/>
            </div>
            <div className = "child"><UsersTable searchText={searchText} triggerSearch={triggerSearch}/></div>
        </div>
    )
}

export default Users;