import './App.css';
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
        <Route path='/ewb' element = {<EwbManuallyStopped sessionObject={sessionObject}/>} />
      </Routes>)}
    </BrowserRouter>
  );
}

export default App;
