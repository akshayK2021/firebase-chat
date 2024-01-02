import { useState } from "react";
import ChatRoom from "./ChatRoom";
import PrivateRoom from "./PrivateRoom";

function ChatHandler() {
  const [roomId, setroom] = useState(null);

  function submitHandler(e) {
    e.preventDefault();
    const id = document.getElementById("imp").value;
    setroom(id);
  }

  return (
    <div className=" w-full   min-h-screen  bg-slate-800">
      {roomId ? (
        <PrivateRoom roomId={roomId} />
      ) : (
        <div className="w-full flex flex-col h-full ">
          <div className="w-full bg- h-full bg-slate-600 p-5">
            <form onSubmit={submitHandler} className="min-w-full mx-auto  flex flex-row w-auto  justify-center space-x-4">
              <input  className=" border-4 flex-grow border-rose-500  bg-slate-100 rounded-lg "   type="text" placeholder="Enter the id " id="imp"></input>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:text-gray-100" type="submit">Join PrivateChatroom</button>
            </form>
          </div>
          <div className="w-full">

          <ChatRoom />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHandler;
