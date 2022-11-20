import React from 'react';
import './Navbar.css';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiFillHome} from 'react-icons/ai';
import {AiFillSetting} from 'react-icons/ai'

const Navbar = () => {
  return (
    <div className='navbar'>

        <GiHamburgerMenu className='icon position' />
        <div className='other-icons'>
            <div className='nav-icons'><AiFillHome className='icon' /> Home</div>
            <div className='nav-icons'><AiFillSetting className='icon' /> Settings</div>
        </div>

    </div>
  )
}

export default Navbar