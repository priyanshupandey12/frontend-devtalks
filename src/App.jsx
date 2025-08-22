import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import { Provider } from 'react-redux'
import store from './store/store'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Request from './components/Request'
import SignUp from './components/SignUp'
import Premium from './components/Premium'
import Chat from './components/Chat'
import FindSimranLanding from './components/FindSimranLanding'

const App = () => {
  return (
    // <Provider store={store}>
    //   <BrowserRouter basename="/">
   
    //     <Routes>
    //       <Route path="/" element={<Body />} >
    //       <Route path="/" element={<Feed />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/profile" element={<Profile />} />
       
    //       <Route path="/connections" element={<Connections />} />
    //       <Route path="/request" element={<Request />} />
    //       <Route path="/signup" element={<SignUp />} />
    //       <Route path="/premium" element={<Premium />} />
    //       <Route path="/chat/:userId" element={<Chat/>}/>
    //       </Route>
    //     </Routes>
  
    //   </BrowserRouter>
    // </Provider>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Landing page route - no authentication required */}
          <Route path="/" element={<FindSimranLanding />} />
          
          {/* Authentication routes - no header/footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected routes with Body wrapper (Header + Footer) */}
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
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App