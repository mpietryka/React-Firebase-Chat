import { LoginForm, Dashboard, RegisterForm, UpdateProfile, Chat } from "./containers";
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
          element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />}
        />

        <Route
          exact
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/updateProfile" element={<UpdateProfile />}/>
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
