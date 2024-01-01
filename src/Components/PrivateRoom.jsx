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
    <div>
      <div>
        <ul>
          {messages.map((msg) => {
            return (
              <li>
                <div>
                  <p>{msg.user}</p>
                  <img src={`${msg.profile}`} />
                  <p>{setTime(msg.createdAt)}</p>
                </div>
                <p>{msg.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text "
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Enter the Message"
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default PrivateRoom;
