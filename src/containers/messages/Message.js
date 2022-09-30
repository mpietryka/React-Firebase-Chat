import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

export const Message = ({ msg, user1 }) => {
  const scrollRef = useRef();

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
        className={`border-1 inline-block max-w-md rounded-xl border border-gray-400 p-4 text-left  ${
          msg.from === user1 ? `bg-blue-500` : `bg-base-200`
        }`}
      >
        {msg.text}
        <br />
        <small className="mt-1 inline-block text-left font-light">
          <Moment fromNow>{msg.sentAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};
