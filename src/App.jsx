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

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
   
        <Routes>
          <Route path="/" element={<Body />} >
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
       
          <Route path="/connections" element={<Connections />} />
          <Route path="/request" element={<Request />} />
          <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
  
      </BrowserRouter>
    </Provider>
  )
}

export default App