import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Request from './components/Request'
import SignUp from './components/SignUp'
import Premium from './components/Premium'
import Chat from './components/Chat'
import CallNotification from './components/CallNotification';
import FindSimranLanding from './components/FindSimranLanding'
import VideoCall from './components/VideoCallWrapper'
const App = () => {
  return (

      <BrowserRouter basename="/">
        <Routes>
       
          <Route path="/" element={<FindSimranLanding />} />
          
      
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
        
          <Route path="/feed" element={<Body />}>
            <Route index element={<Feed />} />
          </Route>
          <Route path="/profile" element={<Body />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/connections" element={<Body />}>
            <Route index element={<Connections />} />
          </Route>
          <Route path="/request" element={<Body />}>
            <Route index element={<Request />} />
          </Route>
          <Route path="/premium" element={<Body />}>
            <Route index element={<Premium />} />
          </Route>
          <Route path="/chat/:userId" element={<Body />}>
            <Route index element={<Chat />} />
          </Route>
         <Route path="/video-call/:channelName" element={<VideoCall />}>
            <Route index element={<VideoCall />} />
          </Route>
        </Routes>
          <CallNotification />
      </BrowserRouter>
  
  )
}

export default App