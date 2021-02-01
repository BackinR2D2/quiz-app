import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './static/Chart';
import Loading from './static/Loading';
import Swal from 'sweetalert2';
import UpdateIcon from '@material-ui/icons/Update';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import config from './static/config';

function Account() {
    const [userData, setUserData] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [userHistory, setUserHistory] = useState([]);
    const [updateForm, setUpdateForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);

    const history = useHistory();

    const schema = yup.object().shape({
        username: yup.string().required(),
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getUserData = await axios.get(`${config.url}/account`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('auth')
                    }
                })
                setUserData(getUserData.data.userInfo);
                setUsername(getUserData.data.userInfo.username);
                setUserHistory(getUserData.data.userHistory);
                setIsLoading(false);
            } catch (error) {
                // TODO: HANDLE ERROR WITH SWAL
                if (error.response.status === 401) {
                    document.querySelector('.logBtn').click();
                    history.push('/');
                    localStorage.removeItem('auth');
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You have to log in again.',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Try again.',
                    })
                }
            }
        }
        fetchData();
    }, [])

    const handleUpdateUsername = async () => {
        try {
            const isRight = await schema.isValid({
                username: newUsername
            })

            if (isRight) {
                // send request to server to update the username
                setUsernameLoading(true);
                const updateUsername = await axios.put(`${config.url}/update-username`, { newUsername }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('auth')
                    }
                })
                setUsernameLoading(false);
                setUsername(updateUsername.data.updatedUsername.username);
                setUpdateForm(false);
            }

        } catch (error) {
            if (error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have to log in again.',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try again.',
                })
            }
        }
    }

    const handleDeleteAccount = async () => {
        try {
            const deleteAccount = await axios.delete(`${config.url}/delete-account`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('auth')
                }
            })
            document.querySelector('.logBtn').click();
            setDeleteAccountLoading(false);
            history.push('/');
        } catch (error) {
            setDeleteAccountLoading(false);
            if (error.response.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have to log in again.',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Try again.',
                })
            }
        }
    }

    const deleteAccount = () => {
        Swal.fire({
            text: 'Confirming further will permanently delete your account. Do you want to continue?',
            icon: 'info',
            confirmButtonText: 'Yep',
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                setDeleteAccountLoading(true);
                handleDeleteAccount()
            }
        })
    }

    return (
        <div className="container">
            <div>
                {
                    isLoading ?
                        <div className="mt18vh">
                            <Loading />
                        </div>
                        :
                        <div className="mt14vh row">
                            <div className="userInfo col">
                                <div style={{ marginBottom: 2 + 'vh' }}>
                                    <img className="userImg accountImg" src={userData.img} alt="user" />
                                </div>
                                <div>
                                    <div className="usernameSection">
                                        {
                                            updateForm ?
                                                <div>
                                                    {
                                                        usernameLoading ?
                                                            <CircularProgress size={50} thickness={2} color={'primary'} />
                                                            :
                                                            <Fade in={updateForm}>
                                                                <div>
                                                                    <div>
                                                                        <TextField /*error={wrongUsername} helperText={wrongUsername ? "Input can not be empty." : ""}*/ id="outlined-basic" label="New username" variant="outlined" onChange={(e) => setNewUsername(e.target.value)} />
                                                                    </div>
                                                                    <div className="btngroup">
                                                                        <Button onClick={handleUpdateUsername} className="mr4px" variant="outlined" color="primary">
                                                                            Save
                                                                        </Button>
                                                                        <Button onClick={() => setUpdateForm(false)} variant="outlined" color="default">
                                                                            Cancel
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Fade>
                                                    }
                                                </div>
                                                :
                                                <p>
                                                    <strong style={{ fontSize: 20 + 'px' }}>{username}</strong>
                                                    <span className="updateBtn">
                                                        <Fab color="primary" aria-label="Update" onClick={() => setUpdateForm(true)}>
                                                            <UpdateIcon />
                                                        </Fab>
                                                    </span>
                                                </p>
                                        }
                                    </div>
                                    {/* <br /> */}
                                    <hr />
                                    <p className="userData"><strong>{userData.email}</strong></p>
                                    <p className="userData">Score: <strong>{userData.score}</strong></p>
                                    <p className="userData">Created at: <strong>{(userData.timestamp).split('T')[0]}</strong></p>
                                    <div>
                                        {
                                            deleteAccountLoading ?
                                                <CircularProgress size={50} thickness={2} color={'primary'} />
                                                :
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={deleteAccount}
                                                >
                                                    Delete Account
                                                </Button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="chart col">
                                <Chart data={userHistory} />
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default Account
