import { useSelector } from "react-redux";
import { Login, Dashboard } from "./containers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
