import { useEffect, useState, useMemo, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import AppContext from "./context/app-context";
import './App.scss';

const SignupScreen = lazy(() => import("./screens/signup-screen"));
const LoginScreen = lazy(() => import("./screens/login-screen"));
const HomeScreen = lazy(() => import("./screens/home-screen"));
const DashboardScreen = lazy(() => import("./screens/dashboard-screen"));
const PostScreen = lazy(() => import("./screens/post-screen"));
const PostDetailsScreen = lazy(() => import("./screens/post-details-screen"));

function App() {
  // const user = localStorage.getItem('user') || null
  const [user, setUser] = useState(null)
  const currentUser = useMemo(() => user, [user])
  const setCurrentUser = (value) => {
    localStorage.setItem('user', value && value !== 'null' ? JSON.stringify(value) : null)
    setUser(value)
  }
  useEffect(() => {
    if (!user && localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [user])
  return (
    <AppContext.Provider value={{
      user: currentUser,
      setCurrentUser
    }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeScreen/>}/>
          <Route path="/post/:id" element={<PostDetailsScreen/>}/>
          <Route exact path="/dashboard" element={<DashboardScreen/>}/>
          <Route exact path="/posts" element={<PostScreen/>}/>
          <Route exact path="/login" element={<LoginScreen/>}/>
          <Route exact path="/signup" element={<SignupScreen/>}/>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
