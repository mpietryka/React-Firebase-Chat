import React from "react";

export const Attachment = ({ attachment, attachmentName }) => {
  return (
    <div className="tooltip" data-tip={attachmentName()}>
      <div
        className={`mt-2 mr-2 cursor-pointer rounded-full px-2 py-2 text-center align-middle text-white opacity-90 transition-opacity duration-150 ease-in-out hover:opacity-100 ${
          attachment ? `hidden` : `bg-gray-500`
        }`}
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
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>
      </div>
    </div>
  );
};
