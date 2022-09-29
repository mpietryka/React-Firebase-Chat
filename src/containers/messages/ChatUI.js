import React, { Fragment, useState } from "react";
import {
  Box,
  Toolbar,
  AppBar,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Listbox, Transition } from "@headlessui/react";
import ChatIcon from "@mui/icons-material/Chat";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export const ChatUI = () => {
  //var socket = new WebSocket('wss://XSockets.net');
  //var socket = new WebSocket('ws://echo.websocket.org');
  //socket.onopen = function(event) {
  //    console.log("Connection established");}

  const ENTER_KEY_CODE = 13; // code for enter code
  const [message, setMessage] = useState(""); // message the user sends
  const [chatMessages, setchatMessages] = useState([]); // displays list of messages

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  /*
 
  //chatMessages = {...message, message}
    //setchatMessages([...chatMessages, message])
    */

  const sendMessage = () => {
    if (message) {
      //console.log('Send!');
      //setChatMessages([...chatMessages, {
      //   message}]);
      console.log(message);
      //webSocket.send(JSON.stringify(message))
      setMessage("");
    }
  };

  // sending the message using enter key rather clicking on the button
  const handleEnterKey = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      sendMessage();
    }
  };

  // display items in our list
  /*
  chatMessageDto.user is the user that sent the message
  We want to replace it with our own users from firebase/local storage
  */
  /*const listChatMessages = chatMessages.map((chatMessageDto, index) =>
    <ListItem key={index}>
      <ListItemText primary={`${chatMessageDto.user}: ${chatMessageDto.message}`} />
    </ListItem>
  );*/

  const people = [
    { name: "Abdirahman Awale" },
    { name: "Ahmed Farah" },
    { name: "Hud Lut" },
    { name: "Martin Taylor" },
    { name: "Lily Martin" },
  ];

  const [selected, setSelected] = useState(people[0]);

  const getUser = (selected) => {
    console.log(selected.name);
    return selected.name;
    //var recepient = selected.name
    //chatTo(selected.name)
  };

  /*const chatTo = (props) =>
  { var to = props.selected.name
    console.log("sending to", to)
    return (to)
 
  }*/

  return (
    <div className="flex w-full flex-col">
      <div className="w-full ">
        <Listbox
          value={selected}
          onChange={setSelected /*(index) => getUser(index)*/}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active
                          ? "bg-emerald-100 text-gray-900"
                          : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      <Box>
        <Grid container spacing={2} xs={8} className=" float-right ">
          <AppBar position="static">
            <Toolbar>
              <Box mr={2}>
                <ChatIcon fontSize={"medium"} />
              </Box>
              <Typography variant="h8">
                You are chatting to: <span>{selected.name}</span>
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid className="h-80" item xs={12}>
            <List className="h-72 overflow-auto">{chatMessages}</List>
          </Grid>
          <Grid item xs={11}>
            <FormControl fullWidth>
              <TextField
                onChange={handleMessageChange}
                onKeyDown={handleEnterKey}
                value={message}
                label="Type your message here..."
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => sendMessage()}
              aria-label="send"
              color="primary"
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
