
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Feed from './components/Feed'
import { Toaster } from 'react-hot-toast';
import Profile from './components/Profile'
import Connections from './components/Connections'
import Request from './components/Request'
import SignUp from './components/SignUp'
import Chat from './components/Chat'
import FindSimranLanding from './components/FindSimranLanding'
const App = () => {
  return (

      <BrowserRouter basename="/">
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
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
   
          <Route path="/chat/:userId" element={<Body />}>
            <Route index element={<Chat />} />
          </Route>
    
        </Routes>
 
      </BrowserRouter>
  
  )
}

export default App