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

const categoriesReducer = (state, action) => {
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

export default function Categories() {
    const [baseUrl, setBaseUrl] = useBaseUrl();
    const [categories, dispatchCategories] = useReducer(categoriesReducer, []);

    const [category, setCategory] = useState("");
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [categoryImage, setCategoryImage] = useState();
    const [imagePath, setImagePath] = useState("");
    const [checked, setChecked] = useState(false);
    const mounted = useRef();

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!mounted.current) {
            axios.get(`${baseUrl}/admin/categories/list`,)
                .then((response) => {
                    console.log(response.data);
                    dispatchCategories({
                        type: "init",
                        payload: response.data
                    })
                })
                .catch((response) => {

                })
            mounted.current = true;
        } else {

        }
    }, [categories])

    const handleChange = (e) => {
        switch (e.target.name) {
            case "categories":
                setCategory(e.target.value);
                axios.get(`${baseUrl}/admin/categories/${e.target.value}`)
                    .then((response) => {
                        const data = response.data;
                        setId(data.id);
                        setName(data.name);
                        setImagePath(baseUrl + data.iconPath);
                        setChecked(data.status);
                    })
                    .catch((response) => {

                    })
                break;
            case "name":
                setName(e.target.value);
                break;
            case "status":
                setChecked(!checked);
                break;
            case "image":
                if (!e.target.files || e.target.length === 0) {
                    return
                }
                setCategoryImage(e.target.files[0]);

                const objectUrl = URL.createObjectURL(e.target.files[0])
                setImagePath(objectUrl);

                break;
            default:
                break;
        }
    }

    const handleClickNew = (e) => {
        setId(null);
        setName("");
        setCategoryImage(null);
        setImagePath(null);
        setChecked(false);
        setCategory(null);
    }

    const handleClickSave = e => {
        e.preventDefault();
        if (!name || name === "") {
            setMessage("Please enter name");
            setOpen(true);
            return;
        }
        let formData = new FormData();
        if (id !== null){
            formData.append("id", id);
        }
        formData.append("name", name);
        formData.append("fileImage", categoryImage);
        formData.append("status", checked);
        axios.post(`${baseUrl}/admin/categories/save`,
            formData,
            {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            })
            .then((response) => {
                console.log(response)
                dispatchCategories({
                    type: 'add',
                    payload: {
                        id: response.data,
                        name: name
                    }
                })
                setCategory(response.data);
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
            setMessage("Vui lòng chọn category để xóa.");
            setOpen(true);
            return;
        }
        axios.delete(`${baseUrl}/admin/categories/delete/${id}`)
            .then(response => {
                setMessage("Success");
                setOpen(true);
                dispatchCategories({
                    type: "delete",
                    payload: {
                        id: id
                    }
                })
                setId(null);
                setName("");
                setCategoryImage(null);
                setImagePath(null);
                setChecked(false);
                setCategory(null);
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
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                    name={"categories"}
                >
                    {categories.map((item, index, arr) => {
                        return <MenuItem value={item.id} key={item.id} name={"categories"}>{item.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Button variant="contained"
                    component="label" sx={{mt: 2}}>
                UploadFile
                <FormControl>
                    <input onChange={handleChange} name={"image"} hidden
                           accept="image/png, image/jpeg" type="file"/>
                </FormControl>
            </Button>
            <FormControl fullWidth>
                <img src={imagePath} width={200} height={200} sx={{mt: 4}}/>
                <TextField id="outlined-basic" label="Name" variant="outlined" sx={{mt: 2}} value={name} name={"name"}
                           onChange={handleChange}/>
                <Checkbox sx={{mt: 2}} checked={checked} name={"status"} onChange={handleChange}/>
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