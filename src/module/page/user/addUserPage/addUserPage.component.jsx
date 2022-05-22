import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import Select from '../../../select/select.component';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './addUserPage.style.scss';

function AddUserPage(){
    let navigate = useNavigate();
    const [user, setUser] = useState({
        "avatar": "",
        "firstName": "",
        "lastName": "",
        "sex": null,
        "birthDay": null,
        "email": "",
        "password": "",
        "role": null,
        "phoneNumber": "",
        "phoneVerified": false,
        "about": "",
        "supremeHost": false,
        "address": {
                "country": null,
                "state": null,
                "city": null,
                "aprtNoAndStreet": ""
            }
    });
    const [idCountry, setIdCountry] = useState(null);
    const [idState, setIdState] = useState(null);
    const [idCity, setIdCity] = useState(null);

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);

    const [preview, setPreview] = useState()

    const handleClose = () => {
        setOpen(false);
      };

    const handleSubmit = function handleSubmit(e){
        e.preventDefault();
        let formData=new FormData();
        formData.append("avatar", user.avatar);
        const avatar = user["avatar"];
        if(avatar!=="")user["avatar"]=avatar.name;
        formData.append("user", JSON.stringify(user));
        axios.post(
            "http://localhost:8080/admin/api/users/add",
            formData,
            {
                headers:{
                    "Content-type":"multipart/form-data",
                }
            }
            )
            .then(res=>{
                //console.log(res);
                navigate("../users", {replace:true});
            })
            .catch(err=>{
                setMessage(err.response.data);
                setTitle("FAIL");
                setOpen(true);
            })
        user["avatar"]=avatar;
    }

    const mounted = useRef();
    useEffect(() => {
    if (!mounted.current) {
        // do componentDidMount logic
        mounted.current = true;
    } else {
        // do componentDidUpdate logic
    }
    });

    const handleInputChange = function handleInputChange(e){
        const input = e.target;
        switch(input.name){
            case "Avatar":
                if (!input.files || input.length === 0) {
                    return
                }
                setUser({...user, "avatar": input.files[0]});

                const objectUrl = URL.createObjectURL(input.files[0])
                setPreview(objectUrl)

                // free memory when ever this component is unmounted
                return () => URL.revokeObjectURL(objectUrl)
            case "FirstName":
                setUser({...user, "firstName": input.value})
                break;
            case "LastName":
                setUser({...user, "lastName": input.value})
                break;
            case "SEX":
                setUser({...user, "sex": input.value})
                break;
            case "BirthDay":
                setUser({...user, "birthDay": input.value})
                break;
            case "Email":
                setUser({...user, "email": input.value})
                break;
            case "Password":
                setUser({...user, "password": input.value})
                break;
            case "Host":
                if(input.checked){
                    setUser({...user, "role": {"id":input.id, "name":input.value}})
                }
                else{
                    setUser({...user, "role": null})
                }
                break;
            case "PhoneNumber":
                setUser({...user, "phoneNumber": input.value})
                break;
            case "Country":
                setUser({...user, 
                    "address": {...user.address,
                        "country": {
                            id:input.value,
                            name:input.querySelector('option:checked').textContent
                        },
                        "state":null,
                        "city":null,
                    }}
                )
                setIdCountry(input.value);
                setIdState(null);
                setIdCity(null);
                break;
            case "State":
                setUser({...user, 
                    "address": {...user.address,
                        "state": {
                            id: input.value,
                            name: input.querySelector('option:checked').textContent
                        },
                        "city":null
                    }}
                )
                setIdState(input.value);
                setIdCity(null);
                break;
            case "City":
                setUser({...user, 
                    "address": {...user.address,
                        "city": {
                            id:input.value,
                            name:input.querySelector('option:checked').textContent
                        }
                    }}
                )
                setIdCity(input.value);
                break;
            case "Address":
                setUser({...user, "address": {...user.address,
                    "aprtNoAndStreet": input.value
                }})
                break;
            case "About":
                setUser({...user, "about": input.value})
                break;
            default:
                break;
        }
    }

    return (
        <div className="user-page">
            Add User Page
            <div className="form-container">
                <form className="user-form" onSubmit={handleSubmit} action="#">
                    <label className="form-label" >Avatar</label>
                    <input className="form-input" name="Avatar" onChange={handleInputChange} accept="image/png, image/jpeg" type="file" width="48" height="48"/>
                    <img className = "avatar" src={preview} alt="avatar"/>

                    <label className="form-label">First Name</label>
                    <input className="form-input" name="FirstName" onChange={handleInputChange} type="text" />

                    <label className="form-label">Last Name</label>
                    <input className="form-input form-input__last-name" name="LastName" onChange={handleInputChange} type="text"/>

                    <input className="form-radio" onChange={handleInputChange} type="radio" id="nam" name="SEX" value="MALE"/>
                    <label className="form-radio__label">NAM</label>
                    <input className="form-radio" onChange={handleInputChange} type="radio" id="nu" name="SEX" value="FEMALE"/>
                    <label className="form-radio__label">NU</label>
                    <input className="form-radio" onChange={handleInputChange} type="radio" id="other" name="SEX" value="OTHER"/>
                    <label className="form-radio__label">OTHER</label>

                    <label className="form-label">Birthday</label>
                    <input className="form-input form-input__birthday" name="BirthDay" onChange={handleInputChange} type="date"/>

                    <label className="form-label">Email</label>
                    <input className="form-input" name="Email" onChange={handleInputChange} type="text"/>

                    <label className="form-label">Password</label>
                    <input className="form-input form-input__last-name" name="Password" onChange={handleInputChange} type="password"/>

                    <input  className="form-radio"  onChange={handleInputChange} type="checkbox" name="Host" id="3" value="Admin"/>
                    <label className="form-radio__label">Admin</label>
                    <input  className="form-radio"  onChange={handleInputChange} type="checkbox" name="Host" id="2" value="User"/>
                    <label className="form-radio__label">User</label>
                    <input  className="form-radio"  onChange={handleInputChange} type="checkbox" name="Host" id="1" value="Host"/>
                    <label className="form-radio__label">Host</label>

                    <label className="form-label">Phone Number</label>
                    <input className="form-input" name="PhoneNumber" onChange={handleInputChange} type="text"/>

                    <label className="form-label">Country</label>
                    <div className="form-input">
                    <Select link="http://localhost:8080/admin/api/country/select_data/" name="Country" curentValue={idCountry} root={true} handleChange={handleInputChange}/>
                    </div>

                    <label className="form-label">State</label>
                    
                    <div className="form-input">
                    <Select link={`http://localhost:8080/admin/api/state/select_data_by_country/`} parentId={idCountry} root={false} name="State" curentValue={idState} handleChange={handleInputChange}/>
                    </div>

                    <label className="form-label">City</label>
                    <div className="form-input">
                    <Select link="http://localhost:8080/admin/api/city/select_data_by_state/" parentId={idState} root={false} name="City" curentValue={idCity} handleChange={handleInputChange}/>
                    </div>


                    <label className="form-label">Address</label>
                    <input className="form-input" name="Address" onChange={handleInputChange} type="text"/>

                    <label className="form-label">About</label>
                    <textarea className="form-input_textarea" name="About" onChange={handleInputChange} rows="9" cols="70"></textarea>

                    <button className="button-submit" >SAVE</button>
                </form>
            </div>
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
        </div>
    )
}

export default AddUserPage;