import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../../firebase-config";
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore";

export const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  //find out what the extension of the media file is
  var ext = msg.mediaName.substr(msg.mediaName.lastIndexOf(".") + 1);
  var user2;

  const deleteMsg = async () => {
    msg.from === user1 ? (user2 = msg.to) : (user2 = msg.from);
    const chatId = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const msgID = msg.uid;
    const msgRef = doc(db, "conversations", chatId, "messages", msgID);

    await updateDoc(msgRef, {
      text: "deleted",
      media: "",
      mediaName: "",
    });

    await setDoc(doc(db, "lastMsg", chatId), {
      text: msg.text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: "",
      mediaName: "",
      unread: true,
    });
  };

  const checkMsgContent = () => {
    if (msg.text === "") {
      return null;
    } else if (msg.text === "deleted") {
      return (
        <span className="float-right text-sm text-gray-300">{msg.text} </span>
      );
    } else {
      return <span>{msg.text}</span>;
    }
  };

  /* check the extension of the media file, if media variable is blank display noting, 
  if image display image
  if video display video */
  const checkExt = () => {
    if (msg.media === "") {
      return null;
    } else if (ext === "png" || ext === "jpg") {
      return <img src={msg.media} alt="attachment" />;
    } else if (ext === "mp4") {
      return <video src={msg.media} width="750" height="500" controls></video>;
    } else if (ext === "wav") {
      return <audio src={msg.media} controls></audio>;
    }
  };

  //scroll to the last message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);

  return (
    <div>
      <div
        className={`mb-6 p-3   ${
          msg.from === user1 ? `text-right` : `text-left`
        }`}
        ref={scrollRef}
      >
        <div
          className={`border-1 inline-block max-w-md rounded-xl border border-gray-300 px-3 py-2 text-left text-white ${
            msg.from === user1 ? `bg-blue-500` : `bg-base-200 text-right`
          }`}
        >
          <div className="text-right">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn-ghost">
                ...
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-40 bg-base-100 text-black shadow"
              >
                <li>
                  <button onClick={deleteMsg}>Delete Message</button>
                </li>
              </ul>
            </div>
          </div>
          {checkExt()}
          {checkMsgContent()}

          <br />
          <small className="inline-block text-left font-light">
            {/* display how long ago the message was sent */}
            <Moment fromNow>{msg.sentAt.toDate()}</Moment>
          </small>
        </div>
      </div>
    </div>
  );
};
