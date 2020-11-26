import React, { useEffect } from 'react';
import Header from '../components/Header';
import {Link} from 'react-router-dom'

const Template = (props) => {
  useEffect(() => {
    const header = document.querySelector('.header')
    header.style.height = "150px"
  }, [])

  return (
    <div className="menu-page bg-page" style={props.style}>
      <Link 
        to={{
          pathname:"/",
          aboutProps: {
            is_back: true
          }
        }} 
        className="back-to-main" 
        style={{position: "absolute", top: "200px"}}>
        <Header className="header"/>
      </Link>
      {props.children}
    </div>
  );
};

export default Template;