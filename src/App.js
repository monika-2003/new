import './App.css';
import EwbExpiredLastWeek from './components/EwbExpiredLastWeek';
import EwbExpiringToday from './components/EwbExpiringToday'
import EwbExtendedToday from './components/EwbExtendedToday'
import EwbManuallyStopped from './components/EwbManuallyStopped'
import Login from './components/Login';
import useSessionVariables from "./components/useSessionVariables.js";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import React from "react";
// import Signup from './components/Signup';
function App() {
  const sessionObject = useSessionVariables();
  return (
    <BrowserRouter>
      {console.log("session object", sessionObject.sessionVariables.access_token)}
      {!sessionObject.sessionVariables.access_token ? (
        //<Signup/>
        <Routes>
          
          <Route path="/" exact element={<Login sessionObject={sessionObject}/>}/>
          {/* <Route path='/signup' element = {<Signup/>}/> */}
      </Routes>):(<Routes>
        {/* <Route path="" element={<Users />} /> */}
        {/*<Route path='/' exact element={<Login sessionObject={sessionObject}/>}/>*/}
        {/* <Route path='/signup' element = {<Signup/>} /> */}
        <Route path='/ewb-expiring-today' element = {<EwbExpiringToday sessionObject={sessionObject}/>} />
        <Route path='/ewb-extended-today' element = {<EwbExtendedToday sessionObject={sessionObject}/>} />
        <Route path='/ewb-manually-stopped' element = {<EwbManuallyStopped sessionObject={sessionObject}/>} />
        <Route path='/ewb-expired-last-week' element = {<EwbExpiredLastWeek sessionObject={sessionObject}/>} />
      </Routes>)}
    </BrowserRouter>
  );
}

export default App;
