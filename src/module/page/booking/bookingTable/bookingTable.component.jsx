import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './bookingTable.style.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useBaseUrl } from "../../../utils/utils";

import axios from 'axios';

function BookingTable({searchText, triggerSearch}) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [bookings, setBookings] = useState([]);

    const [message, setMessage] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [open, setOpen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [status, setStatus] = useState(true);
    const [baseUrl, setBaseUrl] = useBaseUrl();

    const handleClickOpen = (e) => {
        setIdDelete(e.currentTarget.parentNode.parentNode.firstChild.firstChild.textContent);
        setOpen(true);
    };

    const handleClose = (e) => {
        if (e.target.textContent === "DELETE") {
            DeleteHandle();
        }
        setOpen(false);
    };

    const handleCloseNotif = (e) => {
        setOpenMessage(false);
    };

    function DeleteHandle() {
        const URL = `${baseUrl}/admin/api/booking/` + idDelete;

        axios({
            method: 'DELETE',
            url: URL,
        })
            .then(function (response) {
                setMessage(response.data);
                setOpenMessage(true);
                setBookings(bookings.filter(booking => booking.id !== idDelete));
            })
            .catch(function (error) {
                if (error.response) {
                    setMessage(error.response.data);
                    setOpenMessage(true);
                }
            })
            .then(function () {

            });
    }

    function handleStatusChange(e) {
        var id = e.currentTarget.parentNode.parentNode.firstChild.firstChild.textContent;
        axios({
            method: 'post',
            url: `${baseUrl}/admin/api/booking/${id}/change_status`
        })
            .then(response => {
                if (response.data === "Success") setStatus(!status);
            })
            .catch(error => {

            })
    }

    function handlePageChange(e, value) {
        setPage(value);
    }

    useEffect(() => {
        fetch(`${baseUrl}/admin/api/booking?page=${page}&sortField=${'id'}&sortDir=${'asc'}&searchText=${searchText}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBookings(result.content);
                    setTotalPages(result.totalPages);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [page, status, triggerSearch])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="bookings">
                <div className="pagination">
                    <Stack spacing={2}>
                        <Pagination count={totalPages} defaultPage={1} siblingCount={3} onChange={handlePageChange}/>
                    </Stack>
                </div>
                <table className="bookings-table">
                    <thead>
                    <tr>
                        <th className="column1">ID</th>
                        <th className="column2">CHECK IN DATE</th>
                        <th className="column3">CHECK OUT DATE</th>
                        <th className="column4">BOOKING DATE</th>
                        <th className="column5">PRICE PER DATE</th>
                        <th className="column6">NUMBER OF DAY</th>
                        <th className="column7">CUSTOMER</th>
                        <th className="column8">ROOM</th>
                        <th className="column9">STATUS</th>
                        <th className="column10">ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        bookings.map((booking, index) => {
                            return (
                                <tr key={booking.id}>
                                    <td className="column1">
                                        <Link to={`${"edit/" + booking.id}`}>
                                            {booking.id}
                                        </Link>
                                    </td>
                                    <td className="column2">{booking.checkinDate}</td>
                                    <td className="column3">{booking.checkoutDate}</td>
                                    <td className="column4">{booking.bookingDate}</td>
                                    <td className="column5">{booking.pricePerDay}</td>
                                    <td className="column6">{booking.numberOfDays}</td>
                                    <td className="column7">{booking.customer.fullName}</td>
                                    <td className="column8">{booking.room.name}</td>
                                    <td className="column9">
                                        {booking.status ?
                                            <FontAwesomeIcon onClick={handleStatusChange} icon="fas fa-check-circle"
                                                             color="green" size="2x"/> :
                                            <FontAwesomeIcon onClick={handleStatusChange} icon="fas fa-check-circle"
                                                             size="2x"/>}
                                    </td>
                                    <td className="column10">
                                        <button onClick={handleClickOpen}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>


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

export default BookingTable;