import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import AppContext from "./context/app-context";
import SignupScreen from "./screens/signup-screen";
import './App.scss';
import LoginScreen from "./screens/login-screen";
import HomeScreen from "./screens/home-screen";
import DashboardScreen from "./screens/dashboard-screen";

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'))
    }
  }, [localStorage.getItem('user')])
  return (
    <AppContext.Provider value={{
      user
    }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeScreen/>}/>
          <Route exact path="/dashboard" element={<DashboardScreen/>}/>
          <Route exact path="/login" element={<LoginScreen/>}/>
          <Route exact path="/signup" element={<SignupScreen/>}/>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
