import {BrowserRouter, Routes,Route , Navigate}from 'react-router-dom'
import HomePage from "./pages/HomePage"
import ListingDetailsPage from './pages/ListingDetailsPage'
import BookingPage from './pages/BookingPage'
import { useAuthStore } from './store/AuthStore'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'
import HostHomePage from './pages/HostHomePage'

function App () {

  const {user,role}= useAuthStore();
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
          user && role === 'user' ? <HomePage/> : <Navigate to='/login' />}
        />
        <Route path='/login' element={
          user ? <Navigate to='/' /> : <LoginPage/>}
        />
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/listings/:id' element={<ListingDetailsPage/>}/>
        <Route path='/book/:id' element={<BookingPage/>}/>
        <Route path='/hostHome' element={
          user && role === 'host' ? <HostHomePage/>: <Navigate to='/login' />}
        />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
