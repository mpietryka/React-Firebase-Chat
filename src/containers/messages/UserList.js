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
    {
      /* chat id is the usernames of the users combined */
    }
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    {
      /* get last message in real time */
    }
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <div
      className={`flex cursor-pointer flex-row p-2 hover:bg-base-200 md:w-full ${
        chat.username === user.username && `bg-base-200`
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
        <span className="mx-3 text-left font-bold">
          {/* display name */}
          {user.firstName} {user.lastName}
          {/* if last message comes from somebody else and has unread set to true display a NEW badge next to it */}
          {data?.from !== user1 && data?.unread && (
            <span className=" badge badge-primary badge-sm ml-1 align-middle">
              NEW
            </span>
          )}
        </span>
        {/* display last message, trim if too long */}
        {data && (
          <span className="mx-3 w-3/4 overflow-hidden truncate text-xs text-gray-900">
            <strong>{data.from === user1 ? "Me: " : "Them: "}</strong>
            {data.text}
          </span>
        )}
      </div>
    </div>
  );
};
