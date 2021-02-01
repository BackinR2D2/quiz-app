import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Logout from './Logout';
import config from './static/config';
import Swal from 'sweetalert2';

function Signin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();
    const responseGoogle = async (response) => {
        try {
            const userData = await axios.post(`${config.url}/signin`, { response })
            const { data } = userData;
            setIsLoggedIn(true);
            localStorage.setItem('auth', data.token);
            history.push('/');
        } catch (_) {
            handleError();
        }
    }

    const handleError = () => {
        // TODO: HANDLE ERROR WITH SWAL
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Try again.',
        })
    }

    return (
        <div>
            {
                isLoggedIn ?
                    <Logout />
                    :
                    <GoogleLogin
                        clientId="811500721671-j3ucp4m1iskpve2je2244fa9v4iibs57.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={handleError}
                        cookiePolicy={'single_host_origin'}
                        className="logBtn"
                    />
            }
        </div>
    )
}

export default Signin
