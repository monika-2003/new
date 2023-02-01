import React from 'react'
import './Login.css';

const Buttons = (props) => {
  return (
    <div>
        <button className='btn'>{props.name}</button>
    </div>
  )
}

export default Buttons