import { addDoc, collection, onSnapshot, query,orderBy, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react"
import { auth, db } from "../firebase";

function ChatRoom(){
  const [value,setValue]=useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef=collection(db,"public");

  useEffect(() => {

   const messagesRef=collection(db,"public");
   const orderedMessagesQuery = query(messagesRef, orderBy('createdAt'));

  
 
   

    const unsubscribe = onSnapshot(orderedMessagesQuery,(snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setMessages(newMessages);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

 async function submitHandler(e){
    e.preventDefault();
    console.log("value is",value)
    if(value===" "){return;}

    await addDoc(messagesRef,{
      text:value,
      createdAt:serverTimestamp(),
      user:auth.currentUser.displayName,
      profile:auth.currentUser.photoURL
    })

   setValue("");
  
    


  }

  function setTime(timestampObject){
    if(timestampObject){
    const date = new Date(timestampObject.seconds * 1000 + timestampObject.nanoseconds / 1e6)
    const formattedDate = date.toLocaleString()
    return formattedDate}
    else{
      return "now"
    }
  }


  return(
    <div>
      <div>
        <ul>
          {
            messages.map((msg)=>{
              return (
              <li>
               <div>
                <p>{msg.user}</p> 
                <img src={`${msg.profile}`}/>
                <p>{setTime(msg.createdAt) }</p>
                </div>
                <p>{msg.text}</p></li>
              )
            })
          }
        </ul>


      </div>
      <form onSubmit={submitHandler}>
        <input type="text " value={value} onChange={(e)=>{
          setValue(e.target.value)
        }} placeholder="Enter the Message"></input>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default ChatRoom