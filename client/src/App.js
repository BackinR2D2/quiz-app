import './App.css';
import Home from './components/Home';
import Auth from './components/auth/Auth';
import Account from './components/Account';
import NavBar from './components/static/Navbar';
import Leaderboard from './components/Leaderboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/account">
            <Auth Component={Account} />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
