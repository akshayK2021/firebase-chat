import { useState } from "react";
import ChatRoom from "./ChatRoom";
import PrivateRoom from "./PrivateRoom";


function ChatHandler(){
  const [roomId,setroom]=useState(null);
 



  function submitHandler(e){
    e.preventDefault();
    const id=document.getElementById("imp").value
     setroom(id);
  }

  return(
    
    <div>{
      roomId?<PrivateRoom roomId={roomId}/>:(<div>
        <div>
          <form onSubmit={submitHandler}>
          <input type="number" placeholder="Enter the id " id="imp"
           
          ></input>
          <button type="submit">Create PrivateChatroom</button>
          </form>
        </div>
      
      <ChatRoom/></div>)
      
      
      }

    </div>
  )
}


export default ChatHandler