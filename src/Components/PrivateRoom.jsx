import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { db,auth } from "../firebase";
import { useEffect, useState } from "react";


function PrivateRoom(props) {
  console.log("Indside Private",props)
  console.log(props.roomId)
  const roomId=toString(props.roomId)
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "private");
  useEffect(() => {
    const messagesRef = collection(db, "private");
    console.log("messages is",messages)

    const afterQuery = query(
      messagesRef,
      where("room", "==", props.roomId)
      
    );
    
    console.log("afterquery is ",afterQuery)

    const unsubscribe = onSnapshot(afterQuery, (snapshot) => {
      let newMessages=[]
     snapshot.forEach((doc)=>{
      newMessages.push({...doc.data(),id:doc.id})

     })

      setMessages(newMessages);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [props.roomId]);

  function setTime(timestampObject) {
    if (timestampObject) {
      const date = new Date(
        timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1e6
      );
      const formattedDate = date.toLocaleString();
      return formattedDate;
    } else {
      return "now";
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    console.log("value is", value);
    if (value === " ") {
      return;
    }
    console.log("updating the doc")

    await addDoc(messagesRef, {
      text: value,
      createdAt: serverTimestamp(),
      room: props.roomId,
      user: auth.currentUser.displayName,
      profile: auth.currentUser.photoURL,
    });

    setValue("");
  }

  console.log("messages is",messages)

  return (
    <div className="w-full  min-h-11/12 mx-auto pt-8 bg-slate-800">
      {/* Messages */}
      <div className="mb-16 w-full ">
        <ul className="flex flex-col justify-end ">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="mb-4 flex  flex-col items-start  min-h-ma border border-  justify-end w-max   bg-cyan-400 rounded-lg px-6 my-5"
            >
              <div className=" flex flex-row h-auto  ml-6 space-x-24 items-end   ">
                <div className="flex flex-col m-1">
                  <p className="text-gray-500 text-sm">
                    {setTime(msg.createdAt)}
                  </p>
                  <p className=" font-sans font-medium text-black-500 italic">
                    {msg.user}
                  </p>
                </div>
                <div>
                  <img
                    src={msg.profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mb-2"
                  />
                </div>
              </div>
              <div className=" text-white p-4 rounded-lg max-w-xs w-full">
                <div className="bg-purple-500 p-2 w-80 h-auto   break-words box-border  rounded-md font-bold">
                  {msg.text}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Input Form */}
      <form
        onSubmit={submitHandler}
        className="flex  fixed  bg-slate-800 p-4 bottom-0 flex-row  space-x-1 items-center w-full"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter the Message"
          className="flex-grow border rounded-md border-gray-300 rounded-l p-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-r p-2 focus:outline-none w-28 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default PrivateRoom;
