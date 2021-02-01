import React from 'react'
import { Link } from 'react-router-dom';
import AuthContainer from './AuthContainer';

function NavBar() {

    const listStyle = () => {
        const ul = document.querySelector('ul');
        window.onresize = displayWindowSize;
        window.onload = displayWindowSize;

        function displayWindowSize() {
            let myWidth = window.innerWidth;
            if (myWidth > 991) {
                ul.removeAttribute('data-target');
            }
            if (myWidth <= 991) {
                ul.setAttribute('data-target', '.navbar-collapse');
            }
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Quiz game</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav" data-toggle="collapse" data-target=".navbar-collapse" ref={listStyle} >
                        <div className="tcenter">
                            <li className="nav-item active" >
                                <Link className="ml-2 nav-link" to="/">Home</Link>
                            </li>
                        </div>
                        <div className="tcenter">
                            <li className="nav-item active" >
                                <Link className="ml-2 nav-link" to="/account">Account</Link>
                            </li>
                        </div>
                        <div className="tcenter">
                            <li className="nav-item active" >
                                <Link className="ml-2 nav-link" to="/leaderboard">Leaderboard</Link>
                            </li>
                        </div>
                        <div className="tcenter">
                            <li className="ml-4 nav-item active" >
                                <AuthContainer />
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar
