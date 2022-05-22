import React from 'react';
import UsersTable from '../userTable/userTable.component';
import AddUser from '../addUser/addUser.component.jsx';

import './userPage.style.scss';

function Users(){
    return(
        <div className="users-page">
            <h1>Users Management</h1>
            <AddUser/>
            <UsersTable/>
        </div>
    )
}

export default Users;