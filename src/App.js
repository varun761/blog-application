import { useEffect, useState, useMemo, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import AppContext from "./context/app-context";
import './App.scss';
import { Spinner } from "react-bootstrap";
import { ThemeContext, themes } from "./context/theme-context";

const SignupScreen = lazy(() => import("./screens/signup"));
const LoginScreen = lazy(() => import("./screens/login"));
const HomeScreen = lazy(() => import("./screens/home"));
const DashboardScreen = lazy(() => import("./screens/dashboard"));
const PostScreen = lazy(() => import("./screens/post"));
const PostCreateScreen = lazy(() => import("./screens/post/create"));
const PostEditScreen = lazy(() => import("./screens/post/edit"));
const PostDetailsScreen = lazy(() => import("./screens/post/details"));

function App() {
  // const user = localStorage.getItem('user') || null
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState(themes.light)
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
  const toggleTheme = () => {
    console.log('Triggered Theme Change')
    setTheme(theme === themes.dark
      ? themes.light
      : themes.dark)
  }
  return (
    <Suspense fallback={<Spinner variant="primary"/>}>
      <AppContext.Provider value={{
        user: currentUser,
        setCurrentUser
      }}>
        <ThemeContext.Provider value={{
          theme,
          toggleTheme
        }}>
          <Router>
            <Routes>
              <Route exact path="/" element={<HomeScreen/>}/>
              <Route path="/post/:id" element={<PostDetailsScreen/>}/>
              <Route exact path="dashboard" element={<DashboardScreen/>}/>
              <Route exact path="posts" element={<PostScreen/>}/>
              <Route path="posts/create" element={<PostCreateScreen/>}/>
              <Route path="posts/edit/:id" element={<PostEditScreen/>}/>
              <Route exact path="login" element={<LoginScreen/>}/>
              <Route exact path="signup" element={<SignupScreen/>}/>
            </Routes>
          </Router>
        </ThemeContext.Provider>
      </AppContext.Provider>
    </Suspense>
  );
}

export default App;
