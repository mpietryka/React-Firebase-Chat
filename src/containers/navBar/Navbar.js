import { useSelector } from "react-redux";
import avatar from "../dashboard/generic-avatar-1.png";

export const NavBar = (props) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="border-1 navbar sticky top-0 z-50 border border-gray-100 bg-base-100">
      {/* Hamburger button*/}
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <p className="p-4 text-xl font-semibold normal-case">{props.title}</p>
      </div>
      {/* image */}
      <div className="flex-none">
        <label tabIndex="0" className="avatar btn-circle">
          <div className="w-15 mask mask-circle rounded-full">
            {!user.profilePicture ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <img src={user.profilePicture} alt="profilePic" />
            )}
          </div>
        </label>
      </div>
    </div>
  );
};
