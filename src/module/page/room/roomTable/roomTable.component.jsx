import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './roomTable.style.scss';
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

function RoomTable(){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rooms, setRooms] = useState([]);
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
        const URL = `http://localhost:8080/admin/api/room/` + idDelete;

        axios({
            method: 'DELETE',
            url: URL,
        })
            .then(function(response){
                setMessage(response.data);
                setOpenMessage(true);
                setRooms(rooms.filter(room=>room.id !== idDelete));
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
            url: `http://localhost:8080/admin/api/room/${id}/change_status`
        })
        .then(response=>{
            if(response.data === "Success")setStatus(!status);
        })
        .catch(error=>{

        })
    }

    function handlePageChange(e,value){
        setPage(value);
    }

    useEffect(()=>{
        fetch(`http://localhost:8080/admin/api/room?page=${page}&sortField=${'id'}&sortDir=${'asc'}`)
        .then(res=>res.json())
        .then(
            (result)=>{
                setIsLoaded(true);
                setRooms(result.content);
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
        <table className="users-table">
            <thead>
            <tr>
                <th className="room_table-column1">ID</th>
                <th className="room_table-column2">NAME</th>
                <th className="room_table-column3">RATING</th>
                <th className="room_table-column4">PRICE</th>
                <th className="room_table-column5">DESCRIPTION</th>
                <th className="room_table-column6">ADDRESS</th>
                <th className="room_table-column7">STATUS</th>
                <th className="room_table-column8">ACTION</th>
            </tr>
            </thead>
            <tbody>
            {
                rooms.map((room, index)=>{
                    return(
                        <tr key={room.id}>
                            <td className="room_table-column1">
                                <Link to={`${"edit/"+room.id}`}>
                                    {room.id}
                                </Link>
                            </td>
                            <td className="room_table-column2">{room.name}</td>
                            <td className="room_table-column3">{room.rating}</td>
                            <td className="room_table-column4">{room.price}</td>
                            <td className="room_table-column5">{room.description}</td>
                            <td className="room_table-column6">{room.street + ", " + room.city.name + ", " + room.state.name + ", " + room.country.name}</td>
                            <td className="room_table-column7">
                            {room.status?<FontAwesomeIcon onClick={handleStatusChange} icon="fas fa-check-circle" color="green" size="2x"/>:<FontAwesomeIcon onClick={handleStatusChange} icon="fas fa-check-circle" size="2x"/>}
                            </td>
                            <td className="room_table-column8"><button onClick={handleClickOpen}>Delete</button></td>
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
                DELETE THIS ROOM
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

export default RoomTable;