import React from "react";

export const MessageForm = ({ handleSubmit, text, setText }) => {
  return (
    <div>
      {/*text area */}
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-row">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-2 mr-2 h-5 w-full rounded-md border border-gray-400 px-3 py-5 align-middle transition
          ease-in-out hover:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="message"
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-blue-500 px-2 py-2 text-center align-middle text-white opacity-90 transition-opacity hover:opacity-100"
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
