import {
  LoginForm,
  Dashboard,
  RegisterForm,
  UpdateProfile,
  Chat,
  ChangePassword,
} from "./containers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          exact
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          exact
          path="/updateProfile"
          element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/changePassword"
          element={isAuthenticated ? <ChangePassword /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/chat"
          element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
