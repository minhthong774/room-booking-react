import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './userTable.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

function UsersTable(){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [status, setStatus] = useState(true);

    const handleClickOpen = (e) => {
        setIdDelete(e.currentTarget.parentNode.parentNode.firstChild.firstChild.textContent);
        setOpen(true);
    };

    const handleClose = (e) => {
        if(e.target.textContent==="DELETE"){
            DeleteHandle();

        }
        setOpen(false);
    };

    const handleCloseNotif = (e) => {
        setOpenMessage(false);
    };

    function DeleteHandle(){
        const URL = `http://localhost:8080/admin/api/users/` + idDelete;

        axios({
            method: 'DELETE',
            url: URL,
        })
            .then(function(response){
                setMessage(response.data);
                setOpenMessage(true);
                setUsers(users.filter(user=>user.id !== idDelete));
            })
            .catch(function(error){
                if(error.response){
                    setMessage(error.response.data);
                    setOpenMessage(true);
                }
            })
            .then(function(){

            });
    }

    function handleStatusChange(e){
        var id = e.currentTarget.parentNode.parentNode.firstChild.firstChild.textContent;
        axios({
            method: 'post',
            url: `http://localhost:8080/admin/api/users/${id}/change_status`
        })
        .then(response=>{
            if(response.data==="Success")setStatus(!status);
        })
        .catch(error=>{

        })
    }

    function handlePageChange(e,value){
        setPage(value);
    }

    useEffect(()=>{
        fetch(`http://localhost:8080/admin/api/users?page=${page}&sortField=${'id'}&sortDir=${'asc'}`)
        .then(res=>res.json())
        .then(
            (result)=>{
                setIsLoaded(true);
                setUsers(result.content);
                setTotalPages(result.totalPages);
            },
            (error)=>{
                setIsLoaded(true);
                setError(error);
            }
        )
    },[page, status])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
        <div className="users">
        {/* <div className="message">{message?message:""}</div> */}
        <table className="users-table">
            <thead>
            <tr>
                <th className="column1">ID</th>
                <th className="column2">AVATAR</th>
                <th className="column3">FULL NAME</th>
                <th className="column4">PHONE NUMBER</th>
                <th className="column5">ABOUT</th>
                <th className="column6">ADDRESS</th>
                <th className="column7">SEX</th>
                <th className="column8">BIRTHDAY</th>
                <th className="column9">STATUS</th>
                <th className="column10">ACTION</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map((user,index)=>{
                    return(
                        <tr key={user.id}>
                            <td className="column1">
                                <Link to={`${"edit/"+user.id}`}>
                                    {user.id}
                                </Link>
                            </td>
                            <td className="column2"><img src={"http://localhost:8080" + user.avatarPath} alt="avatar"></img></td>
                            <td className="column3">{user.fullName}</td>
                            <td className="column4">{user.phoneNumber}</td>
                            <td className="column5">{user.about}</td>
                            <td className="column6">{user.fullPathAddress}</td>
                            <td className="column7">{user.sex}</td>
                            <td className="column8">{user.birthday}</td>
                            <td className="column9">
                            {user.status?<FontAwesomeIcon onClick={handleStatusChange} icon="fas fa-check-circle" color="green" size="2x"/>:<FontAwesomeIcon onClick={handleStatusChange} icon="fas fa-check-circle" size="2x"/>}
                            </td>
                            <td className="column10"><button onClick={handleClickOpen}>Delete</button></td>
                        </tr>
                ) 
                })
            }
            </tbody>
        </table>
        <div className="pagination">
            <Stack spacing={2}>
                <Pagination count={totalPages} defaultPage={1} siblingCount={3} onChange={handlePageChange}/>
            </Stack>
        </div>
        
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"DELETE WARNING!!!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                DELETE THIS USER
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>DELETE</Button>
            <Button onClick={handleClose} autoFocus>
                NO
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openMessage}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"NOTIFICATION!!!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {message}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseNotif}>OK</Button>
            </DialogActions>
        </Dialog>

        </div>)
    }
}

export default UsersTable;