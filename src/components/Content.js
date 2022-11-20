import React from 'react'
import Background from './Background'
import './EwbExpiringToday.css'
import Card from './Card'
import Buttons from './Buttons'

const Content = () => {
  return (
    <div>
          <Card />

          <div className='align-btns'>
            <Buttons name = "Refresh" />
            <Buttons name = "Stop"  />
          </div>

            <Background />
    </div>
  )
}

export default Content