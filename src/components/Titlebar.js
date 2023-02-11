import React from 'react';
import { useState } from 'react';
import './Titlebar.css';
import {IoMdContact} from 'react-icons/io';
import { Link } from "react-router-dom";
const Titlebar = ({sessionObject}) => {
  const [show, setShow] = useState(false);

  const showPopup = () => {
    console.log(show);
    setShow(!show);
  }
  const logout = () => {
    sessionObject.saveSessionVariableByField("access_token", "");
    localStorage.removeItem('login');
    localStorage.setItem('login_flag',false);
  };
  return (

    <div className='titlebar'>

      <div className={show ? 'popup-container' : 'disable-popup'}>
        <IoMdContact className='pop-icon' />

        <p>{sessionObject.sessionVariables.username}</p>

        <Link to="/"><button className='popup-btn' onClick={logout}>Log Out</button></Link>
      </div>

        <h1 className='title'>SARAL eWAY</h1>

        <div className='login'><span className='sign-in-name'>{sessionObject.sessionVariables.username}</span><IoMdContact className='icon' onClick={showPopup} /></div>

    </div>

  )
}

export default Titlebar