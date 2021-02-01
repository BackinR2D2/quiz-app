import React from 'react'
import Signin from '../Signin';
import Logout from '../Logout';
function AuthContainer() {
    return (
        <>
            {
                localStorage.getItem('auth') ?
                    <Logout />
                    :
                    <Signin />
            }
        </>
    )
}

export default AuthContainer
