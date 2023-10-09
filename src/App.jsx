import React from 'react' 
import Navbar from './components/Navbar' 
import Register from './Pages/Register' 
import Login from './Pages/Login'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import SinglePost from './Pages/SinglePost'
import UserProfile from './Pages/UserProfile'
import NotFound from './Pages/NotFound' 
import Search from './Pages/Search'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 

const token = localStorage.getItem("token")

function App() {
  return (
    <div className="w-screen"> 
      <BrowserRouter> 
      {token ? <Navbar/> : null}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signin" element={<Login/>}/> 
      <Route path="/signup" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/post/:id" element={<SinglePost/>}/> 
      <Route path="/user/:id" element={<UserProfile/>}/>
      <Route path="*" element={<NotFound/>}/> 
      <Route path="/search/:name" element={<Search/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App