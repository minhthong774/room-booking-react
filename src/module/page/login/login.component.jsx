import React, {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './login.style.scss';
import {useBaseUrl} from "../../utils/utils";

function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [baseUrl, setBaseUrl] = useBaseUrl();

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(
            `${baseUrl}/api/auth/login`,
            {
                email: username,
                password: password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(response => {
                const user = response.data.data;
                if (user.role.id == 3) {
                    setToken(user);
                } else {
                    setMessage("access denied");
                }
            })
            .catch(error => {
                setMessage(error.response.data.error);
            })
    }

    return (
        <div>
            <div className="login-wrapper">
                <h1>Please Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <div className="login-message">{message}</div>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Login;