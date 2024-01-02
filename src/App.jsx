
import './App.css'
import {auth,provider} from "./firebase"
import { signInWithPopup } from 'firebase/auth'
// import ChatRoom from './Components/ChatRoom'
import ChatHandler from './Components/ChatHandler'
import { useState } from 'react'

  



function App() {
  const [user,setUser]=useState(null);

  return (
    <div className=' min-w-full'>
      <h1 className='bg-zinc-900 text-red-500 text-5xl w-full box-border mx-auto text-center font-extrabold font-sans' style={{fontFamily:"'Leckerli One', cursive"}}>Firechat</h1>
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
    <div className='flex justify-center items-center h-screen bg-zinc-900  '  > 
      <button className='bg-zinc-700 text-amber-600 text-2xl px-4 py-2 rounded-md' onClick={SignInHandler} style={{fontFamily:"'Tektur', sans-serif"}}>Firechat Google</button>
    </div>
  )
}


export default App;
