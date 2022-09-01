import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import SignupScreen from "./screens/signup";
import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignupScreen/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
