import {BrowserRouter, Routes,Route , Navigate}from 'react-router-dom'
import HomePage from "./pages/HomePage"
import ListingDetailsPage from './pages/ListingDetailsPage'
import BookingPage from './pages/BookingPage'
import { useAuthStore } from './store/AuthStore'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'
import HostHomePage from './pages/HostHomePage'
import { useEffect } from 'react'
import axios from 'axios'
import HostProfilePage from './pages/ProfilePage'
import AddListingPage from './pages/AddListingPage'


function App () {

  // const {user,role}= useAuthStore();
  // console.log("user: ",user ," role: ",role);
  const user = localStorage.getItem('username');
  console.log(user);
  const role = localStorage.getItem('role');
  console.log(role); 
  console.log("user: ",user ," role: ",role);

  useEffect(()=>{
    handleLoginBack();
  },[])

  const handleLoginBack =async()=>{
    console.log("into login back function.");
    console.log("user: ",user ," role: ",role);
    try{
      const token = localStorage.getItem('token');
      if(!token)return;
      const res = await axios.get("http://localhost:8880/api/auth/me",
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        }
      )
      if(!res.data.user)return;
      console.log("request data username",res.data)
      console.log("request data username",res.data.user.username)
      localStorage.setItem('username', res.data.user.username);
    }
    catch(error)
    {
      console.log(error);
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
  }


  return (
    <>
      <BrowserRouter>
      <Routes>
      {/* <Route path='/hostHome' element={ 
        user && role === 'host'?<HostHomePage/>:<Navigate to='/login' />}
        /> */}
        <Route path='/hostHome' element={ <HostHomePage/>}
        />
        <Route path='/' element={
          user  && role === 'user' ? <HomePage/> : <Navigate to='/login' />}
        />
        {/*<Route path='/login' element={
          user ? <Navigate to='/' /> : <LoginPage/>}
        />*/}
        <Route path='/login' element={
           <LoginPage/>}
        />
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/listings/:id' element={<ListingDetailsPage/>}/>
        <Route path='/book/:id' element={<BookingPage/>}/>
        <Route path="/profile" element={<HostProfilePage/>}/>
        <Route path='/addListing' element={<AddListingPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
