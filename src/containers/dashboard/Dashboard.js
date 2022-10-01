import { useSelector } from "react-redux";
import { Avatar } from "../../components";
import avatar from "./generic-avatar-1.png";
import { NavBar } from "../navBar/Navbar";
import { DrawerContent } from "../drawerContent/DrawerContent";

export const Dashboard = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {/* Drawer */}
      <div className="drawer-mobile drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-100">
          <NavBar title="Home" />
          {/* main content here */}
          {/* card */}
          <div className="card mx-auto mt-5 w-3/4 border border-gray-200 bg-base-100 shadow-xl lg:w-1/2">
            <figure className="mx-auto px-10 pt-10">
              {!user.profilePicture ? (
                <Avatar src={avatar} alt="avatar"></Avatar>
              ) : (
                <Avatar src={user.profilePicture} alt="profilePic"></Avatar>
              )}
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">@{user.username}</h2>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>
        </div>
        <DrawerContent home="bordered" />
      </div>
    </>
  );
};
