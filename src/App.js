import { useSelector } from "react-redux";
import { Login, Dashboard} from "./containers";
import { selectUser } from "./features/userSlice";

const App = () => {
  const user = useSelector(selectUser);

  return (
    <div className=" m-0 p-0 flex flex-col h-screen">
      {user ? <Dashboard /> : <Login />}
      
    </div>
  );
};

export default App;
