import React, { useState } from 'react';
import Signin from './Signin';
import { useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

function Logout() {
    const [isLoggedOff, setIsLoggedOff] = useState(false);
    const history = useHistory();
    const logout = async () => {
        setIsLoggedOff(true);
        localStorage.removeItem('auth');
        history.push('/');
    }

    return (
        <div>
            {
                isLoggedOff ?
                    <Signin />
                    :
                    <GoogleLogout
                        clientId="811500721671-j3ucp4m1iskpve2je2244fa9v4iibs57.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                        className="logBtn"
                    />
            }
        </div>
    )
}

export default Logout
