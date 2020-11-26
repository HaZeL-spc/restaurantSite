import React from 'react';

const Header = (props) => {
    return (
        <div className={props.className}>
            <img src='/img/our-logo.svg' alt="Main" width="300" height="150"/>
        </div>
    );
};

export default Header;