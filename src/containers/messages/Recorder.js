import React, { useEffect } from "react";

import { useAudioRecorder } from "lucas-silbernagel-react-audio-recorder";

export const Recorder = ({ attachment, setAttachment }) => {
  const { audioResult, startRecording, stopRecording, status } =
    useAudioRecorder();

  useEffect(() => {
    //startRecording()
    console.log(attachment)
  },[attachment])
  

  const getBlobBack = async (blobUrl) => {
    const BlobUrl = await fetch(blobUrl)
    //.then((res) => res.blob())
    const blob = await BlobUrl.blob()

    let name = blobUrl.slice(-6)
    let filename = name + ".wav"
    console.log("filename: " + filename)
    let wavfromblob = new File([blob], filename, { type: "audio/wav" });
    console.log("converted to wav: " + wavfromblob.name);
    setAttachment(wavfromblob);
  }

  const stop = async () => {
    stopRecording();
    setAttachment(getBlobBack(audioResult))
  };



  return (
    <div className=" flex flex-row">
      <audio controls src={audioResult} />
      <div>
        {status === "idle" ? (
          <div
            className="mt-2 mr-2 cursor-pointer rounded-full bg-gray-500 px-2 py-2 text-center align-middle text-white opacity-90 transition-opacity duration-150 ease-in-out hover:opacity-100"
            onClick={startRecording}
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
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          </div>
        ) : (
          <div
            className="mt-2 mr-2 cursor-pointer rounded-full bg-red-500 px-2 py-2 text-center align-middle text-white opacity-90 transition-opacity duration-150 ease-in-out hover:opacity-100"
            onClick={stop}
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
                d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
