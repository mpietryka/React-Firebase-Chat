/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import avatar from "../dashboard/generic-avatar-1.png";
import { Avatar } from "../../components/avatar/Avatar";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-config";

export const UserList = ({ user, selectUser, currentUser, chat }) => {
  const user2 = user.username;
  const user1 = currentUser;
  const [data, setData] = useState("");

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <div
      className={`flex md:w-full cursor-pointer flex-row p-2 hover:bg-base-200 ${
        chat.username === user.username && `bg-base-200`
      }`}
      onClick={() => selectUser(user)}
    >
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
        <span className="mx-3 text-left font-bold">
          {user.firstName} {user.lastName}
          {data?.from !== user1 && data?.unread && (
            <span className=" badge badge-primary badge-sm ml-1 align-middle">
              NEW
            </span>
          )}
        </span>

        {data && (
          <span className="mx-3 w-3/4 overflow-hidden truncate text-xs text-gray-900">
            <strong>{data.from === user1 ? "Me: " : null}</strong>
            {data.text}
          </span>
        )}
      </div>
    </div>
  );
};
