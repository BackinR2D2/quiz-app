import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './static/Loading';
import Swal from 'sweetalert2';
import config from './static/config';

function Leaderboard() {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${config.url}/leaderboard`);
                setUserData(data.userInfo);
                setIsLoading(false);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }
        getData();
    }, [])
    return (
        <div className="mt18vh">
            {
                isLoading ?
                    <Loading />
                    :
                    <div className="container table-responsive">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" />
                                    <th scope="col">Username</th>
                                    <th scope="col">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.map((el, i) => (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>
                                                <img style={{ width: 3 + 'rem' }} className="userImg" src={el.img} alt="user" />
                                            </td>
                                            <td>{el.username}</td>
                                            <td>{el.score}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default Leaderboard
