
import './App.css'
import {auth,provider} from "./firebase"
import { signInWithPopup } from 'firebase/auth'
// import ChatRoom from './Components/ChatRoom'
import ChatHandler from './Components/ChatHandler'
import { useState } from 'react'



function App() {
  const [user,setUser]=useState(null);

  return (
    <div>
      { user?<ChatHandler/>: <SignIn setUser={setUser}/>  }
    </div>
  )
}

function SignIn(props){

  async function SignInHandler(){
  const result=   await signInWithPopup(auth,provider)
  props.setUser(result.user)
  }

  return (
    <div> 
      <button onClick={SignInHandler}>SignIn with Google</button>
    </div>
  )
}


export default App;
