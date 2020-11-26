import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header'
import Nav from '../components/Nav';
import SiteText from '../components/SiteText';

const Main = (props) => {

  useEffect(() => {
    window.addEventListener('scroll',changeHeader)

    let y = window.innerHeight
    console.log(y)
    if (props.location.aboutProps && props.location.aboutProps.is_back) {
    window.scrollBy({left: 0, top: y, behavior: "auto"})
    }

    return () => {
      console.log(3)
      window.removeEventListener('scroll',changeHeader)
    }
  }, [])

  const changeHeader = (e) => {
    const header = document.querySelector('.header-main')

    if (header) {
      if (window.scrollY === 0) {
        header.style.opacity = '0'
        header.style.height = '0px'
      } else {
        header.style.opacity = '1'
        header.style.height = '150px';
      }
    }
  }

  const moveDown = (e) => {
    console.log(e)
    window.scrollBy({left:0, top:e.screenY, behavior: "smooth"})
  }

  return (
    <div className="main-container">
      <SiteText/>
      <Header className="header-main"/>
      <div className="arrow-container">
        <div onClick={moveDown} className="arrow">
          <div className="arrow-top"></div>
          <div className="arrow-bottom"></div>
        </div>
      </div>
      <div className="main-page bg-page">
        <Nav/>
      </div>
    </div>
  );
};

export default Main;