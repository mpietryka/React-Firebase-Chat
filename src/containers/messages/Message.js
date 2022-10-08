import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

export const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

  //find out what the extension of the media file is
  var ext = msg.mediaName.substr(msg.mediaName.lastIndexOf(".") + 1);

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
    <div
      className={`mb-6 p-3   ${
        msg.from === user1 ? `text-right` : `text-left`
      }`}
      ref={scrollRef}
    >
      <p
        className={`border-1 inline-block max-w-md rounded-xl border border-gray-300 px-3 py-2 text-left  ${
          msg.from === user1 ? `bg-blue-500` : `bg-base-200`
        }`}
      >
        {checkExt()}
        {msg.text ? <span>{msg.text}</span> : null}

        <br />
        <small className="inline-block text-left font-light">
          {/* display how long ago the message was sent */}
          <Moment fromNow>{msg.sentAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};
