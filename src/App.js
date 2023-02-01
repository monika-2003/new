import './App.css';
import EwbExpiredLastWeek from './components/EwbExpiredLastWeek';
import EwbExpiringToday from './components/EwbExpiringToday'
import EwbExtendedToday from './components/EwbExtendedToday'
import EwbManuallyStopped from './components/EwbManuallyStopped'
import Login from './components/Login';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import React from "react";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="" element={<Users />} /> */}
        <Route path='/ewb-expiring-today' element = {<EwbExpiringToday />} />
        <Route path='/ewb-extended-today' element = {<EwbExtendedToday />} />
        <Route path='/ewb-manually-stopped' element = {<EwbManuallyStopped />} />
        <Route path='/ewb-expired-last-week' element = {<EwbExpiredLastWeek />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
