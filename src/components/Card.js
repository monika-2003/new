import React from "react";
import './Card.css';
import { NavLink } from 'react-router-dom'
// import { useHistory } from "react-router-dom";

function Card(props) {
  // const history = useHistory();
  // const handleClick = () => history.push(props.item.url);
  return (

    <div className="cards">
      
      <button  className="card"  style={{border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'}}
        onClick={()=>{
          localStorage.setItem("report_type","expiring_today")
          window.location.reload()
        }}
      >
        Ewb Expiring Today
      </button>
      
      <button  className="card"  style={{border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'}}
        onClick={()=>{
          localStorage.setItem("report_type","extended_today")
          window.location.reload()
        }}
      >
        Ewb Extended Today
      </button>


      <button  className="card"  style={{border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'}}
        onClick={()=>{
          localStorage.setItem("report_type","manually_stopped")
          window.location.reload()
        }}
      >
        Ewb Manually Stopped
      </button>

      <button  className="card" style={{border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'}}
        onClick={()=>{
          localStorage.setItem("report_type","expied_last_week")
          window.location.reload()
        }}
      >
        Ewb Expired Last Week
      </button>
    
      <button  className="card" style={{border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'}}
        onClick={()=>{
          localStorage.setItem("report_type","all")
          window.location.reload()
        }}
      >
        All Ewb
      </button>
    </div>
  );
}

export default Card;
