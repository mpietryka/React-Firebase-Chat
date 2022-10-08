import React from "react";
import { Attachment } from "./Attachment";
import { Recorder } from "./Recorder";

export const MessageForm = ({
  handleSubmit,
  text,
  setText,
  setAttachment,
  attachment,
  onChangeHandler,
}) => {
  const removeAttachment = () => {
    setAttachment("");
  };

  const attachmentName = () => {
    if (attachment) {
      return attachment.name;
    } else {
      return "no attachments";
    }
  };

  return (
    <div>
      {/*handle submit comes from Messages.js */}
      <form onSubmit={handleSubmit}>
        <div className="botton-0 sticky z-50 flex h-14 w-full flex-row ">
          {/* add attachment input button */}
          <div className="flex flex-row">
            <Recorder
              attachment={attachment}
              setAttachment={setAttachment}
              attachmentName={attachmentName}
            />
          </div>
          <div>
            <label htmlFor="attachment">
              <Attachment
                attachment={attachment}
                attachmentName={attachmentName}
              />
            </label>

            <input
              onChange={(event) => onChangeHandler(event)}
              type="file"
              className="hidden"
              id="attachment"
              accept="image/png, image/jpeg, video/mp4"
            />
          </div>
          {/* remove attachment button */}
          <div className="tooltip" data-tip={attachmentName()}>
            <div
              className={`mt-2 mr-2 cursor-pointer rounded-full px-2 py-2 text-center align-middle text-white opacity-90 transition-opacity duration-150 ease-in-out hover:opacity-100 ${
                attachment ? `bg-gray-500` : `hidden`
              }`}
              onClick={removeAttachment}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          {/*text input */}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-2 mr-2 mb-1 h-5 w-full rounded-md border border-gray-400 px-3 py-5 align-middle transition
          ease-in-out hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="message"
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-blue-500 px-3 py-2 text-center align-middle text-white opacity-90 transition-opacity duration-150 ease-in-out hover:opacity-100 active:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
