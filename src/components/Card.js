import React from "react";
import './Card.css';
import { NavLink } from 'react-router-dom'
// import { useHistory } from "react-router-dom";

function Card(props) {
  // const history = useHistory();
  // const handleClick = () => history.push(props.item.url);
  return (

    <div className="cards">
      <NavLink to = '/ewb-expiring-today' style={({ isActive }) =>
              isActive ? {border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'} : undefined
            } className ='underline'><div className="card">Ewb Expiring Today</div></NavLink>


      <NavLink to='/ewb-extended-today' style={({ isActive }) =>
              isActive ? {border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'} : undefined
            } className ='underline'><div className="card">Ewb Extended Today</div></NavLink>


      <NavLink to = '/ewb-manually-stopped' style={({ isActive }) =>
              isActive ? {border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'} : undefined
            } className ='underline'><div className="card">Ewb Manually Stopped</div></NavLink>


      <NavLink to = '/ewb-expired-last-week' style={({ isActive }) =>
              isActive ? {border: '3px solid #36A1FB' , borderRadius: '7px' , color: '#36A1FB'} : undefined
            } className ='underline'><div className="card">Ewb Expired Last Week</div></NavLink>
    </div>
  );
}

export default Card;
