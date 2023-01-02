import React, { useEffect } from 'react'
import Background from './Background'
import './EwbExpiringToday.css'
import Card from './Card'
import Buttons from './Buttons'
import { useState} from 'react'

const Content = () => {
  const [refresh,setRefresh]=useState(false);
  useEffect(()=>{

    
  },[refresh])
  return (
    <div>
          <Card />

          <div className='align-btns'>
            <Buttons name = "Refresh" onClick={()=>setRefresh(true)}/>
            <Buttons name = "Stop"  />
          </div>

            <Background />
    </div>
  )
}

export default Content