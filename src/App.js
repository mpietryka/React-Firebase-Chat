//import { useSelector } from "react-redux";
import { LoginForm, Dashboard, RegisterForm } from "./containers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
      <Route path="/" element={
          !isAuthenticated 
          ? <LoginForm/> 
          : <Navigate to='/'/>
        } />

      <Route exact path="/dashboard" element={
          isAuthenticated 
          ? <Dashboard/> 
          : <Navigate to='/'/>
        } />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
