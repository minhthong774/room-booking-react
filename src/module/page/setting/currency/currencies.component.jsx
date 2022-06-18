import React, {useEffect, useReducer, useRef, useState} from 'react';
import axios from "axios";
import {useBaseUrl} from "../../../utils/utils.jsx";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

function compare( a, b ) {
    if ( a.title < b.title ){
        return -1;
    }
    if ( a.title > b.title ){
        return 1;
    }
    return 0;
}

const currenciesReducer = (state, action) => {
    switch (action.type) {
        case "init":
            return action.payload;
            break;
        case 'add':
            return [...state.filter(item => item.id != action.payload.id), action.payload].sort(compare);
        case 'delete':
            return state.filter(item => item.id != action.payload.id);
        default:
            return state;
    }
}

export default function Currencies() {
    const [baseUrl, setBaseUrl] = useBaseUrl();
    const [currencies, dispatchCurrencies] = useReducer(currenciesReducer, []);

    const [currency, setCurrency] = useState("");
    const [id, setId] = useState(null);
    const [unit, setUnit] = useState("");
    const [symbol, setSymbol] = useState("");
    const mounted = useRef();

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!mounted.current) {
            axios.get(`${baseUrl}/admin/currencies/list`,)
                .then((response) => {
                    console.log(response.data);
                    dispatchCurrencies({
                        type: "init",
                        payload: response.data
                    })
                })
                .catch((response) => {

                })
            mounted.current = true;
        } else {

        }
    }, [currencies])

    const handleChange = (e) => {
        switch (e.target.name) {
            case "currencies":
                setCurrency(e.target.value);
                axios.get(`${baseUrl}/admin/currencies/${e.target.value}`)
                    .then((response) => {
                        const data = response.data;
                        setId(data.id);
                        setUnit(data.unit);
                        setSymbol(data.symbol);
                    })
                    .catch((response) => {

                    })
                break;
            case "unit":
                setUnit(e.target.value);
                break;
            case "symbol":
                setSymbol(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleClickNew = (e) => {
        setId(null);
        setCurrency(-1);
        setUnit("");
        setSymbol("");
    }

    const handleClickSave = e => {
        e.preventDefault();
        if (!unit || unit === "") {
            setMessage("Please enter unit");
            setOpen(true);
            return;
        }
        if (!symbol || symbol === "") {
            setMessage("Please enter symbol");
            setOpen(true);
            return;
        }
        axios.post(`${baseUrl}/admin/currencies/save`,
            {
                unit: unit,
                symbol: symbol,
            },
            )
            .then((response) => {
                console.log(response)
                dispatchCurrencies({
                    type: 'add',
                    payload: {
                        id: response.data,
                        unit: unit
                    }
                })
                setCurrency(response.data);
                setId(response.data);
                setMessage("Update success");
                setOpen(true);
            })
            .catch(err => {
                console.log(err);
                setMessage(err.response.data);
                setOpen(true);
            })
    }

    const handleClickDelete = e => {
        if (id === null) {
            setMessage("Vui lòng chọn currency để xóa.");
            setOpen(true);
            return;
        }
        axios.delete(`${baseUrl}/admin/currencies/delete/${id}`)
            .then(response => {
                setMessage("Success");
                setOpen(true);
                dispatchCurrencies({
                    type: "delete",
                    payload: {
                        id: id
                    }
                })
                setId(null);
                setUnit("");
                setSymbol("");
            })
            .catch(err => {
                setMessage("Failured");
                setOpen(true);
            })
    }

    const handleClose = e => {
        setOpen(false);
    }

    return (<div>
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                    name={"currencies"}
                >
                    {currencies.map((item, index, arr) => {
                        return <MenuItem value={item.id} key={item.id} name={"currencies"}>{item.unit}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <TextField id="outlined-basic" label="Unit" variant="outlined" sx={{mt: 2, mb: 2}} value={unit} name={"unit"}
                           onChange={handleChange}/>
                <TextField id="outlined-basic" label="Symbol" variant="outlined" sx={{mt: 2, mb: 2}} value={symbol} name={"symbol"}
                           onChange={handleChange}/>
            </FormControl>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleClickNew}>NEW</Button>
                <Button variant="contained" onClick={handleClickSave}>SAVE</Button>
                <Button variant="contained" onClick={handleClickDelete}>DELETE</Button>
            </Stack>
        </Box>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    </div>)
}