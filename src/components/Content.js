import React, { useEffect } from 'react'
import Background from './Background'
import './EwbExpiringToday.css'
import Card from './Card'
import Buttons from './Buttons'
import { useState} from 'react'
import { SERVER_URL,ACCESS_TOKEN } from '../config/config'

const Content = () => {
  const [result,setResult]=useState({})
  const [refresh,setRefresh]=useState(false);
  const [stop,setStop]=useState(false);
  useEffect(()=>{

    
  },[refresh])
  useEffect(()=>{
    const fetchData = async () => {
      var response = await fetch(SERVER_URL+"/eway/eway_bill_stop/", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
          "Authorization":ACCESS_TOKEN
        },
        
      })

      const data = await response.json();
      setResult(data)
      console.log("Here:",data,ACCESS_TOKEN)
    }
    fetchData();    
  },[stop])
  return (
    <div>
          <Card />

          <div className='align-btns'>
            <Buttons name = "Refresh" onClick={()=>setRefresh(true)}/>
            <Buttons name = "Stop"  onClick={()=>setStop(true)} />
          </div>

            <Background />
    </div>
  )
}

export default Content