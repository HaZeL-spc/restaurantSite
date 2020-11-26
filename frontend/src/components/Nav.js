import React from 'react';
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <div className="container">
            <div className="navbar">
                <Link className="card card-nav" style={{width: "100%"}} to="/menu">
                    <div className="card-body text-center align-middle">
                        <h5 className="card-title">Menu</h5>
                    </div>
                </Link>

                <Link className="card card-nav" style={{width: "100%"}} to="/contact">
                    <div className="card-body text-center">
                        <h5 className="card-title">Kontakt</h5>
                    </div>
                </Link>
                <Link className="card card-nav" style={{width: "100%"}} to="/about">
                    <div className="card-body text-center">
                        <h5 className="card-title">O nas</h5>
                    </div>
                </Link>

                {/* <div className="card card-nav" style={{width: "18rem"}}>
                    <div className="card-body text-center">
                        <h5 className="card-title">Promocje</h5>
                    </div>
                </div> */}
                <Link className="card card-nav bg-nav-admin" style={{width: "100%"}} to="/admin/messages">
                    <div className="card-body text-center">
                        <h5 className="card-title">Wiadomości</h5>
                    </div>
                </Link>
                <Link className="card card-nav bg-nav-admin" style={{width: "100%"}} to="/admin/add-meal">
                    <div className="card-body text-center">
                        <h5 className="card-title">Dodaj posiłek</h5>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Nav;