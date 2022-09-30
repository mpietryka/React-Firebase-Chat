/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { NavBar } from "../navBar/Navbar";
import { DrawerContent } from "../drawerContent/DrawerContent";
import { useSelector } from "react-redux";
import { UserList } from "./UserList";
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
import { db } from "../../firebase-config";

export const Messages = () => {
  const currentUser = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
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

    const msgRef = collection(db, "messages", id, "chat");
    const q = query(msgRef, orderBy("sentAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== currentUser) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user1 = currentUser.username;
    const user2 = chat.username;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    if (text !== "") {
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: user1,
        to: user2,
        sentAt: Timestamp.fromDate(new Date()),
      });
      setText("");
    }

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      sentAt: Timestamp.fromDate(new Date()),
      unread: true,
    });
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
            <div className="md:grid w-full md:grid-cols-4">
              <div className="border-1 md:col-span-1 md:h-full md:border">
                <div className="flex flex-row md:flex-col sticky top-16">
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
              <div className="md:col-span-3 bg-base-100 pb-8">
                <div className="h-full">
                  {chat ? (
                    <div className="sticky top-16 z-50 h-20 w-full bg-gray-100 p-6">
                      <p className="text-left text-xl font-semibold">
                        {chat.firstName} {chat.lastName}
                      </p>
                    </div>
                  ) : (
                    <div className="sticky top-16 z-50 h-20 w-full bg-gray-100 p-6">
                      <p className="text-center text-xl font-semibold">
                        Select a User
                      </p>
                    </div>
                  )}
                  
                  <div>
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
                    <MessageForm
                      handleSubmit={handleSubmit}
                      text={text}
                      setText={setText}
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
