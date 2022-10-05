/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import avatar from "../dashboard/generic-avatar-1.png";
import { Avatar } from "../../components/avatar/Avatar";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

export const UserListDropdown = ({ user, selectUser, currentUser, chat }) => {
  const user2 = user.username;
  const user1 = currentUser;
  const [data, setData] = useState("");

  return (
    <div
      className={`flex cursor-pointer flex-row p-2 hover:bg-gray-200 md:w-full ${
        chat.username === user.username && `bg-gray-100`
      }`}
      onClick={() => selectUser(user)}
    >
      {/* display Avatar */}
      <label tabIndex="0" className="avatar btn-circle">
        <div className="w-15 mask mask-circle rounded-full">
          {!user.profilePicture ? (
            <Avatar src={avatar} alt="avatar"></Avatar>
          ) : (
            <Avatar src={user.profilePicture} alt="profilePic"></Avatar>
          )}
          <img src={avatar} alt="avatar" />
        </div>
      </label>
      <div className="hidden md:flex md:flex-col">
        <span className="mx-3 text-left text-base">
          {/* display name */}
          {user.firstName} {user.lastName}
        </span>
      </div>
    </div>
  );
};
