import React from "react";
import './Card.css';
import { NavLink } from 'react-router-dom'
// import { useHistory } from "react-router-dom";

function Card(props) {
  // const history = useHistory();
  // const handleClick = () => history.push(props.item.url);
  let report_type = localStorage.getItem("report_type")
  return (

    <div className="cards">
      
      <button  className={report_type=="expiring_today"?"cardbordered":"card"}
        onClick={()=>{
          localStorage.setItem("report_type","expiring_today")
          window.location.reload()
        }}
      >
        Ewb Expiring Today
      </button>
      
      <button  className={report_type=="extended_today"?"cardbordered":"card"}
        onClick={()=>{
          localStorage.setItem("report_type","extended_today")
          window.location.reload()
        }}
      >
        Ewb Extended Today
      </button>


      <button  className={report_type=="manually_stopped"?"cardbordered":"card"}
        onClick={()=>{
          localStorage.setItem("report_type","manually_stopped")
          window.location.reload()
        }}
      >
        Ewb Manually Stopped
      </button>

      <button  className={report_type=="expied_last_week"?"cardbordered":"card"}
        onClick={()=>{
          localStorage.setItem("report_type","expied_last_week")
          window.location.reload()
        }}
      >
        Ewb Expired Last Week
      </button>
    
      <button  className={report_type=="all"?"cardbordered":"card"}
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
