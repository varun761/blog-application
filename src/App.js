import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SignupScreen from "./screens/Signup";
import './App.scss';
import LoginScreen from "./screens/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginScreen/>}/>
        <Route exact path="/signup" element={<SignupScreen/>}/>
      </Routes>
    </Router>
  );
}

export default App;
