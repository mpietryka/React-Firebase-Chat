/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { NavBar } from "../navBar/Navbar";
import { DrawerContent } from "../drawerContent/DrawerContent";
import { useSelector } from "react-redux";
import { UserList } from "./UserList";
import { UserListDropdown } from "./UserListDropdown";
import { MessageForm } from "./MessageForm";
import { Message } from "./Message";
import {
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage, db } from "../../firebase-config";
import swal from "sweetalert";

export const Messages = () => {
  const currentUser = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState("");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users");

    //find all users apart from the logged in user
    const q = query(
      usersRef,
      where("username", "not-in", [currentUser.username])
    );
    //execute the query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const selectUser = async (user) => {
    setChat(user);
    const user1 = currentUser.username;
    const user2 = user.username;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgRef = collection(db, "conversations", id, "messages");
    const q = query(msgRef, orderBy("sentAt", "asc"));

    //retrieve chat messages in real time
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      //populate the temporary msgs array with the data from the database
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      //assign temporary array to the main msgs state
      setMsgs(msgs);
    });

    //retrieve the last message
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== currentUser) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  //check the file size, no more than 5mb
  const onChangeHandler = (event) => {
    let fileSize = event.target.files[0].size;
    if (fileSize > 5242880) {
      swal(
        "Your file is too big! The limit is 5mb",
        "Select a smaller file and try again",
        "warning"
      );
    } else {
      setAttachment(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if attachment exists, if it does return its name, if not return empty string.
    const attachmentName = () => {
      if (attachment) {
        return attachment.name;
      } else {
        return "";
      }
    };

    const user1 = currentUser.username;
    const user2 = chat.username;

    //id of the chat, both usernames combined
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    //send the attachment to the storage
    let url;
    if (attachment) {
      const attachmentRef = ref(
        storage,
        `attachments/${new Date().getTime()} - ${attachment.name}`
      );
      const snap = await uploadBytes(attachmentRef, attachment);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    //add new entry to the database, collection "conversations", subcollection "messages"
    if (text !== "" || attachment !== "") {
      await addDoc(collection(db, "conversations", id, "messages"), {
        text,
        from: user1,
        to: user2,
        sentAt: Timestamp.fromDate(new Date()),
        mediaName: attachmentName(),
        media: url || "",
      });
    }

    //set last message, overwrite the old last message with the new one
    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      mediaName: attachmentName(),
      unread: true,
    });
    setText("");
    setAttachment("");
  };

  return (
    <>
      {/* Drawer */}
      <div className="drawer-mobile drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-100  scrollbar-hide">
          <NavBar title="Messages" />
          {/* UserList Section */}
          <div className="relative flex flex-grow">
            <div className="w-full md:grid md:grid-cols-4">
              <div className="border-1 md:col-span-1 md:h-full md:border-r">
                {/* Extra div allowing to start new convo */}
                <div className="hidden h-20 w-full bg-gray-100 px-6 py-4 text-left align-middle text-xl font-semibold md:flex md:flex-row md:justify-between">
                  <div className=" pt-3">Conversations</div>
                  {/* dropdown menu with the list of users */}
                  <div className="dropdown dropdown-end dropdown-hover ">
                    <label tabIndex={0} className="btn btn-ghost">
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
                    >
                      {users.map((user) => (
                        <UserListDropdown
                          key={user.username}
                          user={user}
                          selectUser={selectUser}
                          currentUser={currentUser.username}
                          chat={chat}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="sticky top-16 flex flex-row md:flex-col">
                  {/* display the list of users */}
                  {users.map((user) => (
                    <UserList
                      key={user.username}
                      user={user}
                      selectUser={selectUser}
                      currentUser={currentUser.username}
                      chat={chat}
                    />
                  ))}
                </div>
              </div>
              {/* Chat Section */}
              <div className="bg-base-100 pb-8 md:col-span-3">
                <div className="h-full">
                  {/* if user selected */}
                  {chat ? (
                    <div className="sticky top-16 z-50 h-20 w-full bg-gray-100 p-6">
                      <p className="text-left text-xl font-semibold">
                        {/* display the user we're currently chatting with */}
                        {chat.firstName} {chat.lastName}
                      </p>
                    </div>
                  ) : (
                    <div className="sticky top-16 z-50 h-20 w-full bg-gray-100 p-6">
                      <p className="text-left text-xl font-semibold">
                        {/* if not display a default */}
                        Select a User
                      </p>
                    </div>
                  )}

                  <div>
                    {/* display the list of messages */}
                    {msgs.length
                      ? msgs.map((msg, i) => (
                          <Message
                            key={i}
                            msg={msg}
                            user1={currentUser.username}
                          />
                        ))
                      : null}
                  </div>
                  <div className="fixed bottom-0 my-4 mx-8 w-10/12 md:w-6/12">
                    {/* display text input field */}
                    <MessageForm
                      handleSubmit={handleSubmit}
                      text={text}
                      setText={setText}
                      setAttachment={setAttachment}
                      onChangeHandler={onChangeHandler}
                      attachment={attachment}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DrawerContent messages="bordered" />
      </div>
    </>
  );
};
