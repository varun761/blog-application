import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Spinner } from "react-bootstrap";
import { Store } from "./store";
import { Provider } from "react-redux";

const SignupScreen = lazy(() => import("./screens/signup"));
const LoginScreen = lazy(() => import("./screens/login"));
const HomeScreen = lazy(() => import("./screens/home"));
const DashboardScreen = lazy(() => import("./screens/dashboard"));
const PostScreen = lazy(() => import("./screens/post"));
const PostCreateScreen = lazy(() => import("./screens/post/create"));
const PostEditScreen = lazy(() => import("./screens/post/edit"));
const PostDetailsScreen = lazy(() => import("./screens/post/details"));

function App() {
  return (
    <Suspense fallback={<Spinner variant="primary" />}>
      <Provider store={Store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/post/:id" element={<PostDetailsScreen />} />
            <Route exact path="dashboard" element={<DashboardScreen />} />
            <Route exact path="posts" element={<PostScreen />} />
            <Route path="posts/create" element={<PostCreateScreen />} />
            <Route path="posts/edit/:id" element={<PostEditScreen />} />
            <Route exact path="login" element={<LoginScreen />} />
            <Route exact path="signup" element={<SignupScreen />} />
          </Routes>
        </Router>
      </Provider>
    </Suspense>
  );
}

export default App;
