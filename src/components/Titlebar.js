import React from 'react';
import { useState } from 'react';
import './Titlebar.css';
import {IoMdContact} from 'react-icons/io'

const Titlebar = () => {

  const [show, setShow] = useState(false);

  const showPopup = () => {
    console.log(show);
    setShow(!show);
  }

  return (

    <div className='titlebar'>

      <div className={show ? 'popup-container' : 'disable-popup'}>
        <IoMdContact className='pop-icon' />

        <p>Dhrumil Punjabi</p>
        <p>dhrumilpunjabi.dp@gmail.com</p>

        <button className='popup-btn'>Log Out</button>
      </div>

        <h1 className='title'>SARAL eWAY</h1>

        <div className='login'><span className='sign-in-name'>Dhrumil</span><IoMdContact className='icon' onClick={showPopup} /></div>

    </div>

  )
}

export default Titlebar