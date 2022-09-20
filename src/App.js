import {
  LoginForm,
  Dashboard,
  RegisterForm,
  UpdateProfile,
  Chat,
  ChangePassword,
  Settings,
  UpdateProfilePicture,
} from "./containers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <div style={{ height: '100%', left: '0px', width: '100%', overflow: 'hidden'}} className='pb-10'>
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
          path="/updateProfilePicture"
          element={
            isAuthenticated ? <UpdateProfilePicture /> : <Navigate to="/" />
          }
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
        <Route
          exact
          path="/settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
