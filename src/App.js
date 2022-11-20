import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EwbExpiringToday from './components/EwbExpiringToday';
import EwbExtendedToday from './components/EwbExtendedToday';
import Login from './components/Login';
import EwbManuallyStopped from './components/EwbManuallyStopped';
import EwbExpiredLast7Days from './components/EwbExpiredLast7Days';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = '/' exact component = {Login} />
          <Route path = '/ewb-expiring-today' exact component = {EwbExpiringToday} />
          <Route path = '/ewb-extended-today' exact component = {EwbExtendedToday} />
          <Route path = '/ewb-manually-stopped' exact component = {EwbManuallyStopped} />
          <Route path = '/ewb-expired-last7-days' exact component = {EwbExpiredLast7Days} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
